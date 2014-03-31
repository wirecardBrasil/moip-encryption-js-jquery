// TODO [fireball] : montar JSON da api do moip para envio direto ou pro servidor do lojista
// TODO [fireball] : no caso de envio pro lojista tem que usar jsonp
// TODO [fireball] : verficar como fica pra configurar url no build
// TODO [fireball] : implementar testes
(function () {
  var Moip = {
    version: '1.0.0'
  };

  Moip.create = function (options) {
    return new Moip.FormEncryptor(options);
  };


  Moip.FormEncryptor = function (options) {
    self = this;
    self.version = Moip.version;
    self.publicKey = options.publicKey;


    var hiddenFields = [];
    var encryptor = new JSEncrypt({ default_key_size: 2048 });
    encryptor.setPublicKey(self.publicKey);

    var findForm = function (object) {
      if (window.jQuery && object instanceof jQuery) {
        return object[0];
      } else if (object.nodeType && object.nodeType === 1) {
        return object;
      } else {
        return document.getElementById(object);
      }
    };

    var findInputs = function(form) {
      var inputs = [];
      var children = form.children;

      for (var i = 0; i < children.length; i++) {
        var input = children[i];

        if (input.nodeType === 1 && input.attributes['data-encrypted-input']) {
          inputs.push(input);
        } else if (input.children && input.children.length > 0) {
          inputs.concat(findInputs(input));
        }
      }

      return inputs;
    };

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
      var inputs = findInputs(form);

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

    self.onSubmit = function (form, callback) {

      form = findForm(form);

      var encryptionCallback = function (e) {
        prepareForm(form);
        return (!!callback) ? callback(e) : e;
      };

      attachCallback(form, encryptionCallback);
    };
  };

  window.Moip = Moip;
})();
