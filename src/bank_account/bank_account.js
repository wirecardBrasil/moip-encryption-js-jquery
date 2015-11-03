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

      var validator;

      switch(this.bankNumber){
        case "001":
          validator = Moip.BancoDoBrasilValidator;
          break;
        case "237":
          validator = Moip.BradescoValidator;
          break;
        case "341":
          validator = Moip.ItauValidator;
          break;
        default:
          validator = Moip.GenericBankAccountValidator;
      }

      var errors = [];

      if(!this.bankNumberIsValid(this.bankNumber)){
        errors.push({ description: "Banco inválido", code: "BANK_NUMBER" });
      }

      if(!validator.agencyNumberIsValid(this.agencyNumber)){
        errors.push({ description: "Agência inválida", code: "AGENCY_NUMBER" });
      }
      
      if(!validator.agencyCheckNumberIsValid(this.agencyCheckNumber)){
        errors.push({ description: "Dígito da agência inválido", code: "AGENCY_CHECK_NUMBER" });
      }

      if(errors.length === 0) {
        callbacks.valid();
      } else {
        callbacks.invalid({ errors: errors });
      }
    },

    bankNumberIsValid : function (bankNumber) {
      return /^(?!000)([0-9]{3})$/.test(bankNumber);
    }
  
  };

  Moip.BankAccount = BankAccount;

})(window);
