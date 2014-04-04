Moip.PaymentSender = function(baseUrl) {

    var DONE = 4;

    var self = this;
    self.baseUrl = baseUrl;

    var isOrderId = function(id) {
        return (/ORD-[a-zA-Z0-9]{12}/).test(id);
    };

    var isMultiOrderId = function(id) {
        return (/MOR-[a-zA-Z0-9]{12}/).test(id);
    };

    var buildUrl = function(id) {
        if (isOrderId(id)) {
            return self.baseUrl + '/orders/' + id + '/payments';
        } else if (isMultiOrderId(id)) {
            return self.baseUrl + '/multiorders/' + id + '/multipayments';
        }

        throw 'Unknown id [' + id + '],  doesn\'t belong to any order or multiorder.';
    };

    var doPost = function(url, paymentObject, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState === DONE && callback) {
            callback(xmlHttp.responseText);
          }
        };

        xmlHttp.open('post', url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.send(JSON.stringify(paymentObject));
    };

    this.postPayment = function(id, paymentObject, callback) {
        var resourceUrl = buildUrl(id);
        doPost(resourceUrl, paymentObject, callback);
    };
};
