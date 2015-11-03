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
      return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
    }
  };

  Moip.BancoDoBrasilValidator = BancoDoBrasilValidator();

})(window);