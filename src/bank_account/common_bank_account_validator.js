(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function CommonBankAccountValidator() {
    if ( !( this instanceof CommonBankAccountValidator ) ) {
      return new CommonBankAccountValidator();
    }
  }

  CommonBankAccountValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
    }
  };

  Moip.CommonBankAccountValidator = CommonBankAccountValidator();

})(window);