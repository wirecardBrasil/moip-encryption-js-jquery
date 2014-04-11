/*! moip.js - version: 1.0.0 - 11/04/2014 */
(function () {

var VERSION = '1.0.0';
var TARGET_URL = 'http://homolog/order-api/v2';

var Moip = {
  version: VERSION,
  targetUrl: TARGET_URL
};

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
        inputs.concat(this.extractInputs(input));
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
        setProperty(result, processAttributeName(input.getAttribute('data-encrypted-input')), input.value);
      }
    }

    return result;
  };

  this.build = function (form) {
    var formToConvert = formExtractor.findForm(form);
    var inputs = formExtractor.extractInputs(formToConvert);
    return buildJson(inputs);
  };
};

Moip.PaymentSender = function(baseUrl) {

  var DONE = 4;

  var self = this;
  self.baseUrl = baseUrl;

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
          callback(validJSON);
        } else {
          throw 'JSONP call returned invalid or empty JSON';
        }
      }
    }
  };

  var isOrderId = function(id) {
    return (/ORD-[a-zA-Z0-9]{12}/).test(id);
  };

  var isMultiOrderId = function(id) {
    return (/MOR-[a-zA-Z0-9]{12}/).test(id);
  };

  var serialize = function(obj, prefix) {
    var result = [];

    for(var property in obj) {
      var key = prefix ? prefix + '[' + property + ']' : property, value = obj[property];
      result.push(typeof value == 'object' ? serialize(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    return result.join('&');
  };

  var buildUrl = function(id, payment) {
    if (isOrderId(id)) {
      return self.baseUrl + '/orders/' + id + '/payments/jsonp?payment=' + encodeURIComponent(JSON.stringify(payment)) + '&callback=JSONPCallback';
    } else if (isMultiOrderId(id)) {
      return self.baseUrl + '/multiorders/' + id + '/multipayments/jsonp?payment=' + encodeURIComponent(JSON.stringify(payment)) + '&callback=JSONPCallback';
    }

    throw 'Unknown id [' + id + '],  doesn\'t belong to any order or multiorder.';
  };

  var doPost = function(url, paymentObject, callback) {
    var container = jsonp.fetch(url, callback);
    document.getElementsByTagName('body')[0].removeChild(container);

//    var xmlHttp = new XMLHttpRequest();
//
//    xmlHttp.onreadystatechange = function() {
//      if (xmlHttp.readyState === DONE && callback) {
//        callback(xmlHttp.responseText);
//      }
//    };
//
//    xmlHttp.open('post', url, true);
//    xmlHttp.setRequestHeader('Content-Type', 'application/json');
//    xmlHttp.send(JSON.stringify(paymentObject));
  };

  this.postPayment = function(id, paymentObject, callback) {
    var resourceUrl = buildUrl(id, paymentObject);
    doPost(resourceUrl, paymentObject, callback);
  };
};

})();
