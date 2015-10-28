(function(window) {

 var Moip = window.Moip || {};
 window.Moip = Moip;
 
 function BankAccount(params) {
    this.bankNumber = params.bankNumber;
    this.agencyNumber = params.agencyNumber;
    this.agencyCheckNumber = params.agencyCheckNumber;
    this.accountNumber = params.accountNumber;
    this.accountCheckNumber = params.accountCheckNumber;
 }

 BankAccount.prototype = {

  isValid : function (){
    if(!this.bankNumber)
      return false;

    switch(this.bankNumber){
      case "001":
        return Moip.BancoDoBrasilValidator.isValid(this);
        break;
    }
  },

  agencyNumberIsValid : function (){
    if(!this.bankNumber)
      return false;
    
    switch(this.bankNumber){
      case "001":
        return Moip.BancoDoBrasilValidator.agencyNumberIsValid(this);
        break;
    }
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
 
 Moip.BankAccount = BankAccount;

})(window);
