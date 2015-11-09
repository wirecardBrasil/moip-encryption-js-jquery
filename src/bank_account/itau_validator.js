(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function ItauValidator() {
    if ( !( this instanceof ItauValidator ) ) {
      return new ItauValidator();
    }
  }

  ItauValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 5 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    }
  };

  Moip.ItauValidator = ItauValidator();

})(window);