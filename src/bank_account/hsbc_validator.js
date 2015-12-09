(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function HSBCValidator() {
    if ( !( this instanceof HSBCValidator ) ) {
      return new HSBCValidator();
    }
  }

  HSBCValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 6 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.GenericBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    checkNumberMatch: function(bankAccount) {
      return true;
    }
  };

  Moip.HSBCValidator = HSBCValidator();

})(window);