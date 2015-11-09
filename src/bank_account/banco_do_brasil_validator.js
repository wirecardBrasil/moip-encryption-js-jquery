(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BancoDoBrasilValidator() {
    if ( !( this instanceof BancoDoBrasilValidator ) ) {
      return new BancoDoBrasilValidator();
    }
  }

  BancoDoBrasilValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber.length == 1 && Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == 9 && Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    }
  };

  Moip.BancoDoBrasilValidator = BancoDoBrasilValidator();

})(window);