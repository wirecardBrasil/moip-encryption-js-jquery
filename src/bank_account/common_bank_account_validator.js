(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function CommonBankAccountValidator() {
    if ( !( this instanceof CommonBankAccountValidator ) ) {
      return new CommonBankAccountValidator();
    }
  }

  CommonBankAccountValidator.prototype = {
    agencyNumberLength: function() {
      return 4;
    },

    agencyNumberIsValid: function(agencyNumber) {
      return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return /^[a-zA-Z0-9]{1}$/.test(accountCheckNumber);
    },

    agencyNumberMsgError: function(length) {
      return "A agência deve conter " + length + " números. Complete com zeros a esquerda se necessário.";
    },

    accountNumberMsgError: function(length) {
      return "A conta corrente deve conter " + length + " números. Complete com zeros a esquerda se necessário.";
    }
  };

  Moip.CommonBankAccountValidator = CommonBankAccountValidator();

})(window);