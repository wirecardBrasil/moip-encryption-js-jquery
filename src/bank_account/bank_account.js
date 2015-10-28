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
      default:
        return Moip.DefaultBankValidator.isValid(this);
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
  }
  
 };
 
 Moip.BankAccount = BankAccount;

})(window);
