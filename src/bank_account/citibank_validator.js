(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function CitibankValidator() {
    if ( !( this instanceof CitibankValidator ) ) {
      return new CitibankValidator();
    }
  }

  CitibankValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 7 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    checkNumberMatch: function(bankAccount) {
      return true;
    }
  };

  Moip.CitibankValidator = CitibankValidator();

})(window);