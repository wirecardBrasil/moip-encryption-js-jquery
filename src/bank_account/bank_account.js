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

      var errors = [];
      var validator;
      var validators = {
        "001": Moip.BancoDoBrasilValidator,
        "237": Moip.BradescoValidator,
        "341": Moip.ItauValidator,
        "033": Moip.SantanderValidator,
        "041": Moip.BanrisulValidator,
        "075": Moip.CitibankValidator,
        "399": Moip.HSBCValidator
      };

      if (validators[this.bankNumber]) {
        validator = validators[this.bankNumber];
      } else {
        validator = Moip.GenericBankAccountValidator;
      }

      if(!Moip.GenericBankAccountValidator.bankNumberIsValid(this.bankNumber)){
        errors.push({ description: "Banco inválido", code: "BANK_NUMBER" });
      }

      if(!validator.agencyNumberIsValid(this.agencyNumber)){
        errors.push({ description: "Agência inválida", code: "AGENCY_NUMBER" });
      }
      
      if(!validator.agencyCheckNumberIsValid(this.agencyCheckNumber)){
        errors.push({ description: "Dígito da agência inválido", code: "AGENCY_CHECK_NUMBER" });
      }

      if(!validator.accountNumberIsValid(this.accountNumber)){
        errors.push({ description: "Conta corrente inválida", code: "ACCOUNT_NUMBER" });
      }
      
      if(!validator.accountCheckNumberIsValid(this.accountCheckNumber)){
        errors.push({ description: "Dígito da conta corrente inválido", code: "ACCOUNT_CHECK_NUMBER" });
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
