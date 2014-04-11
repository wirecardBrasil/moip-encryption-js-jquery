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
