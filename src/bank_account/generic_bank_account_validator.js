(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function GenericBankAccountValidator() {
    if ( !( this instanceof GenericBankAccountValidator ) ) {
      return new GenericBankAccountValidator();
    }
  }

  GenericBankAccountValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,2}$/.test(agencyCheckNumber);
    }
  };

  Moip.GenericBankAccountValidator = GenericBankAccountValidator();

})(window);