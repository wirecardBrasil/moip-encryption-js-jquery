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
      return accountNumber.length == this.accountNumberLength() && 
        Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      return checkNumberCalculated === bankAccount.agencyCheckNumber;
    },

    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      return checkNumberCalculated === bankAccount.accountCheckNumber;
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

  Moip.BancoDoBrasilValidator = BancoDoBrasilValidator();

})(window);