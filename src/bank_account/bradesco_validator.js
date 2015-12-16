(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BradescoValidator() {
    if ( !( this instanceof BradescoValidator ) ) {
      return new BradescoValidator();
    }
  }

  BradescoValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber.length == 1 && Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 7 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      return checkNumberCalculated === bankAccount.agencyCheckNumber;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      return checkNumberCalculated === bankAccount.accountCheckNumber;
    }
  };

  Moip.BradescoValidator = BradescoValidator();

})(window);