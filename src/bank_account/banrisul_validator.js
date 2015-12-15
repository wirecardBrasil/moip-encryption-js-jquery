(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BanrisulValidator() {
    if ( !( this instanceof BanrisulValidator ) ) {
      return new BanrisulValidator();
    }
  }

  BanrisulValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber.length == 2 && Moip.GenericBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 9 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      return checkNumberCalculated === bankAccount.agencyCheckNumber;
    },

    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      return checkNumberCalculated === bankAccount.accountCheckNumber;
    }
  };

  Moip.BanrisulValidator = BanrisulValidator();

})(window);