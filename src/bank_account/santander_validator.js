(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function SantanderValidator() {
    if ( !( this instanceof SantanderValidator ) ) {
      return new SantanderValidator();
    }
  }

  SantanderValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 8 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    checkNumberMatch: function(bankAccount) {
      return true;
    }
  };

  Moip.SantanderValidator = SantanderValidator();

})(window);