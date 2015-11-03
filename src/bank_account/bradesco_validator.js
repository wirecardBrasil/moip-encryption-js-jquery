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
    }
  };

  Moip.BradescoValidator = BradescoValidator();

})(window);