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
      return accountNumber.length == this.accountNumberLength() && 
        Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      return true;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      return true;
    },

    agencyNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyNumberMsgError();
    },

    accountNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.accountNumberMsgError(this.accountNumberLength());
    },

    accountNumberLength: function() {
      return 8;
    }
  };

  Moip.SantanderValidator = SantanderValidator();

})(window);