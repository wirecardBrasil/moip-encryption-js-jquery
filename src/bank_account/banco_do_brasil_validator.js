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
      return agencyNumber.length == 4;
    }
  };

  Moip.BancoDoBrasilValidator = BancoDoBrasilValidator();

})(window);