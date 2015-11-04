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
    },

    bankNumberIsValid : function (bankNumber) {
      return /^([0-9-A-Za-x]{3,5})$/.test(bankNumber);
    }
  };

  Moip.GenericBankAccountValidator = GenericBankAccountValidator();

})(window);