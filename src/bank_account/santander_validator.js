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
      return accountNumber.length == 12 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    }
  };

  Moip.SantanderValidator = SantanderValidator();

})(window);