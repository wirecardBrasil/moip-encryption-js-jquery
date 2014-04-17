// TODO [fireball] : incluir caso de uso para envio direto para o lojista

Moip.create = function (options) {

  var formEncryptor = new Moip.FormEncryptor(options);

  // TODO [fireball] : tem que alterar pro envio direto de json criptografar os dados.
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

    while (hiddenFields.length > 0) {
      try { form.removeChild(hiddenFields[0]); } catch (e) {}
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

      if (input.attributes['data-encrypted-input']) {
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

  var detachMe = function (event) {
    if (window.jQuery) {
      return; // nothing to do, jquery events are triggered only one time
    } else if (event.target.removeEventListener) {
      event.target.removeEventListener(event.type, arguments.callee);
    } else if (event.target.detachEvent) {
      event.target.detachEvent('on' + event.type, arguments.callee);
    }
  };

  var attachCallback = function (form, callback) {

    if (window.jQuery) {
      window.jQuery(form).one('submit', callback);
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

      if (window.jQuery) {
        e.preventDefault();
      } else {
        return false;
      }

      detachMe(e);
    };

    attachCallback(form, encryptionCallback);
  };
};

window.Moip = Moip;
