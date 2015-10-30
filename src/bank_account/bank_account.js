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

    validate : function (callbacks){
      if(!this.bankNumber)
        return false;

      var validator;

      switch(this.bankNumber){
        case "001":
          validator = Moip.BancoDoBrasilValidator;
          break;
        default:
          validator = Moip.DefaultBankValidator;
      }

      var errors = [];
      if(!validator.agencyNumberIsValid(this.agencyNumber)){
        errors.push({ description: "Agência inválida", code: "AGENCY_NUMBER" });
      }

      if(errors.length === 0) {
        callbacks.valid();
      } else {
        callbacks.invalid({ errors: errors });
      }
    }
  
  };

  Moip.BankAccount = BankAccount;

})(window);
