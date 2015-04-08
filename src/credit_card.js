(function() {
var VERSION = '1.0.0';

var Moip = {
  version: VERSION,
  publicKey: null,
};

Moip.CreditCard = function() {
  var hash = function() {
    if (!Moip.publicKey) {
      return null;
    }

    var encryptor = new JSEncrypt({default_key_size: 2048});
    encryptor.setPublicKey(Moip.publicKey);

    var toEncrypt = "number=" + this.number + "&";
    toEncrypt += "cvc=" + this.cvc + "&";
    toEncrypt += "expirationMonth=" + this.expirationMonth + "&";
    toEncrypt += "expirationYear=" + this.expirationYear;

    return encryptor.encrypt(toEncrypt);
  }
  return { number: null, cvc: null, hash: hash };
}

window.Moip = Moip;
})();
