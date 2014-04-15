/*! moip.js - version: 1.0.0 - 15/04/2014 */
(function () {

var VERSION = '1.0.0';
var TARGET_URL = 'http://production/order-api/v2';

var Moip = {
  version: VERSION,
  targetUrl: TARGET_URL
};

// TODO [fireball] : incluir caso de uso para envio direto para o lojista

Moip.create = function (options) {

  var formEncryptor = new Moip.FormEncryptor(options);

  // TODO [fireball] : tem que alterar pro envio direto de json criptografar os dados.
  var paymentSender = new Moip.PaymentSender(this.targetUrl);

  return { onSubmit: formEncryptor.onSubmit, postPayment: paymentSender.postPayment };
};

Moip.FormEncryptor = function (options) {

  this.publicKey = options.publicKey;
  this.token = options.token;

  var hiddenFields = [];
  var encryptor = new JSEncrypt({ default_key_size: 2048 });
  encryptor.setPublicKey(this.publicKey);

  var formExtractor = new Moip.FormExtractor();
  var jsonBuilder = new Moip.JsonBuilder();
  var paymentSender = new Moip.PaymentSender(this.token, Moip.targetUrl);

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

      if (window.jQuery) {
        e.preventDefault();
      } else {
        return false;
      }
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

  this.extractInputs = function (form, includeHidden) {
    var extractHidden = includeHidden || false;
    var inputs = [];
    var children = form.children;

    for (var i = 0; i < children.length; i++) {
      var input = children[i];

      if (input.nodeType === 1 && (input.attributes['data-encrypted-input'] || input.attributes['data-input'])) {
        inputs.push(input);
      } else if (input.getAttribute('type') === 'hidden' && extractHidden) {
        inputs.push(input);
      } else if (input.children && input.children.length > 0) {
        inputs = inputs.concat(this.extractInputs(input));
      }
    }

    return inputs;
  };
};

Moip.JsonBuilder = function () {

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
        setProperty(result, processAttributeName(input.getAttribute('name')), input.value);
      }
    }

    return result;
  };

  this.build = function (form) {
    var formToConvert = formExtractor.findForm(form);
    var inputs = formExtractor.extractInputs(formToConvert, true);
    return buildJson(inputs);
  };
};

Moip.PaymentSender = function(token, baseUrl) {

  var DONE = 4;

  var self = this;
  self.baseUrl = baseUrl;
  self.token = token;

  var jsonp = {
    callbackCounter: 0,

    fetch: function(url, callback) {
      var fn = 'JSONPCallback_' + this.callbackCounter++;
      window[fn] = this.evalJSONP(callback);
      url = url.replace('=JSONPCallback', '=' + fn);

      var scriptTag = document.createElement('script');
      scriptTag.src = url;

      var jsonpContainer = document.createElement('div');
      jsonpContainer.setAttribute('id', fn);
      jsonpContainer.appendChild(scriptTag);

      document.getElementsByTagName('body')[0].appendChild(jsonpContainer);

      return jsonpContainer;
    },

    evalJSONP: function(callback) {
      return function(data) {
        var validJSON = false;

        if (typeof data == "string") {
          try {validJSON = JSON.parse(data);} catch (e) {/*invalid JSON*/}
        } else {
          validJSON = JSON.parse(JSON.stringify(data));
          window.console && console.warn('response data was not a JSON string');
        }

        if (validJSON) {
          callback(JSON.stringify(validJSON, null, 4));
        } else {
          throw 'JSONP call returned invalid or empty JSON';
        }
      }
    }
  };

  var isOrderId = function(id) {
    return (/^ORD-[a-zA-Z0-9]{12}$/).test(id);
  };

  var isMultiOrderId = function(id) {
    return (/^MOR-[a-zA-Z0-9]{12}$/).test(id);
  };

  var buildUrl = function(id, payment) {
    if (isOrderId(id)) {
      return self.baseUrl + '/orders/jsonp/' + id + '/payments?token=' + self.token + '&payment=' + encodeURIComponent(JSON.stringify(payment)) + '&callback=JSONPCallback';
    } else if (isMultiOrderId(id)) {
      return self.baseUrl + '/multiorders/jsonp/' + id + '/multipayments?token=' + self.token + '&payment=' + encodeURIComponent(JSON.stringify(payment)) + '&callback=JSONPCallback';
    }

    throw 'Unknown id [' + id + '],  doesn\'t belong to any order or multiorder.';
  };

  var doPost = function(url, paymentObject, callback) {
    var container = jsonp.fetch(url, callback);
    document.getElementsByTagName('body')[0].removeChild(container);
  };

  this.postPayment = function(id, paymentObject, callback) {
    var resourceUrl = buildUrl(id, paymentObject);
    doPost(resourceUrl, paymentObject, callback);
  };
};

})();
