// TODO [fireball] : no caso de envio pro lojista tem que usar jsonp

Moip.create = function (options) {

  var formEncryptor = new Moip.FormEncryptor(options);
  var paymentSender = new Moip.PaymentSender(this.targetUrl);

  return { onSubmit: formEncryptor.onSubmit, postPayment: paymentSender.postPayment };
};

Moip.FormEncryptor = function (options) {

  this.publicKey = options.publicKey;

  var hiddenFields = [];
  var encryptor = new JSEncrypt({ default_key_size: 2048 });
  encryptor.setPublicKey(this.publicKey);

  var formExtractor = new Moip.FormExtractor();
  var jsonBuilder = new Moip.JsonBuilder();
  var paymentSender = new Moip.PaymentSender(Moip.targetUrl);

  var cleanHidden = function (form) {

    for (var i = 0; i < hiddenFields.length; i++) {
      form.removeChild(hiddenFields[i]);
      hiddenFields.shift();
    }
  };

  var encrypt = function (value) {
    return encryptor.encrypt(value);
  };

  var createInput = function(tag, attributes) {

    var input = document.createElement(tag);

    for (var attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        var value = attributes[attribute];
        input.setAttribute(attribute, value);
      }
    }

    return input;
  }

  var encryptInputs = function (inputs) {

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var inputName = input.getAttribute('data-encrypted-input');

      var encryptedValue = encrypt(input.value);
      input.removeAttribute('name');

      var hiddenInput = createInput('input', {
        value: encryptedValue,
        type: 'hidden',
        name: inputName
      });

      hiddenFields.push(hiddenInput);
    }

    return hiddenFields;
  };

  var injectInputs = function(form, inputs) {
    for (var i = 0; i < inputs.length; i++) {
      form.appendChild(inputs[i]);
    }
  };

  var prepareForm = function (form) {
    var inputs = formExtractor.extractInputs(form);

    cleanHidden(form);

    var encryptedInputs = encryptInputs(inputs);
    injectInputs(form, encryptedInputs);
  };

  var attachCallback = function (form, callback) {
    if (window.jQuery) {
      window.jQuery(form).submit(callback);
    } else if (form.addEventListener) {
      form.addEventListener('submit', callback, false);
    } else if (form.attachEvent) {
      form.attachEvent('onsubmit', callback);
    }
  };

  this.onSubmit = function (id, form, callback) {

    form = formExtractor.findForm(form);

    var encryptionCallback = function (e) {
      prepareForm(form);

      var jsonPayment = jsonBuilder.build(form);
      paymentSender.postPayment(id, jsonPayment, callback);
    };

    attachCallback(form, encryptionCallback);
  };
};

window.Moip = Moip;
