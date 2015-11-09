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
    }
  };

  Moip.BradescoValidator = BradescoValidator();

})(window);