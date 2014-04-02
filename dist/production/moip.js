/*! moip.js - version: 1.0.0 - 02/04/2014 */
(function () {

var VERSION = '1.0.0';
var TARGET_URL = 'http://production/order-api/v2';

var Moip = {
  version: VERSION,
  targetUrl: TARGET_URL
};

// TODO [fireball] : montar JSON da api do moip para envio direto ou pro servidor do lojista
// TODO [fireball] : no caso de envio pro lojista tem que usar jsonp
// TODO [fireball] : implementar testes

Moip.create = function (options) {
  return new Moip.FormEncryptor(options);
};

Moip.FormEncryptor = function (options) {

  this.version = Moip.version;
  this.publicKey = options.publicKey;

  var hiddenFields = [];
  var encryptor = new JSEncrypt({ default_key_size: 2048 });
  encryptor.setPublicKey(this.publicKey);

  var formExtractor = new Moip.FormExtractor();

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

  this.onSubmit = function (form, callback) {

    form = formExtractor.findForm(form);

    var encryptionCallback = function (e) {
      prepareForm(form);
      return (!!callback) ? callback(e) : e;
    };

    attachCallback(form, encryptionCallback);
  };
};

window.Moip = Moip;

Moip.FormExtractor = function () {

  this.findForm = function (form) {
    if (window.jQuery && form instanceof jQuery) {
      return form[0];
    } else if (form.nodeType && form.nodeType === 1) {
      return form;
    }

    return document.getElementById(form);
  };

  this.extractInputs = function (form) {
    var inputs = [];
    var children = form.children;

    for (var i = 0; i < children.length; i++) {
      var input = children[i];

      if (input.nodeType === 1 && (input.attributes['data-encrypted-input'] || input.attributes['data-input'])) {
        inputs.push(input);
      } else if (input.children && input.children.length > 0) {
        inputs.concat(findInputs(input));
      }
    }

    return inputs;
  };
};

Moip.JsonBuilder = function (form) {

  var myForm = form;
  var formExtractor = new Moip.FormExtractor();

  var processAttributeName = function (name) {

    var multilevelAttributeRegex = /\[([a-zA-Z0-9]+)\]/;
    var items = name.split(multilevelAttributeRegex);
    var result = [];

    if (items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i]) {
          result.push(items[i]);
        }
      }
    }

    return result;
  };

  var setProperty = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length-1;
    for (var i = 0; i < lastKeyIndex; ++ i) {
      var key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }

      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  var buildJson = function (inputs) {
    var result = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.hasAttribute('data-input')) {
        setProperty(result, processAttributeName(input.getAttribute('data-input')), input.value);
      } else if (input.getAttribute('type') === 'hidden') {
        setProperty(result, processAttributeName(input.getAttribute('data-encrypted-input')), input.value);
      }
    }

    return result;
  };

  this.build = function () {
    // atenção nessa linha com o this.form
    var formToConvert = formExtractor.findForm(myForm);
    var inputs = formExtractor.extractInputs(formToConvert);
    return buildJson(inputs);
  };
};

})();
