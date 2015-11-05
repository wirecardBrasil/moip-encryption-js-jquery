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
      return Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 10 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    }
  };

  Moip.BanrisulValidator = BanrisulValidator();

})(window);