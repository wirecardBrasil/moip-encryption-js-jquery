(function(window) {

 var Moip = window.Moip || {};
 window.Moip = Moip;
 
 function CreditCard(params) {
    this.number = params.number;
    this.cvc = params.cvc;
    this.expMonth = params.expMonth;
    this.expYear = params.expYear;
    this.pubKey = params.pubKey;
 }

 CreditCard.prototype = {

  hash : function() {
    if (!this.pubKey || !this.number || !this.cvc || !this.expMonth || !this.expYear) {
      return null;
    }

    var encryptor = new JSEncrypt({default_key_size: 2048});
    encryptor.setPublicKey(this.pubKey);

    var toEncrypt = "number=" + this.number + "&";
    toEncrypt += "cvc=" + this.cvc + "&";
    toEncrypt += "expirationMonth=" + this.expMonth + "&";
    toEncrypt += "expirationYear=" + this.expYear;

    return encryptor.encrypt(toEncrypt);
  },
  
  isValid : function(){
    if (!this.pubKey || !this.number || !this.cvc || !this.expMonth || !this.expYear) {
        return false;
    }
    var numberValid = Moip.Validator.isValid(this.number);
    var cvcValid = Moip.Validator.isSecurityCodeValid(this.number, this.cvc);
    var expValid = Moip.Validator.isExpiryDateValid(this.expMonth, this.expYear);
    return numberValid && cvcValid && expValid;
  },
  
  cardType : function(){
    type =  Moip.Validator.cardType(this.number);
    if(!type){
        return null;
    }
    return type.brand;
  },

  _setPubKey : function(key){
    this.pubKey = key;
  },
  
  _setNumber : function(number){
    this.number = number;
  },
  
  _setCvc : function(cvc){
    this.cvc = cvc;
  },
  
  _setExpMonth : function(expMonth){
    this.expMonth = expMonth;
  },
  
  _setExpYear : function(expYear){
    this.expYear = expYear;
  }
  
 };
 
 Moip.CreditCard = CreditCard;

})(window);
