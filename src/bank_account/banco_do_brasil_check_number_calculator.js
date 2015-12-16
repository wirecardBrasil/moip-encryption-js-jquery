(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BancoDoBrasilCheckNumberCalculator() {
    if ( !( this instanceof BancoDoBrasilCheckNumberCalculator ) ) {
      return new BancoDoBrasilCheckNumberCalculator();
    }
  }

  BancoDoBrasilCheckNumberCalculator.prototype = {

    // Account validation
    calculateAccount: function(accountNumber) {
      var numbers = accountNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        seq = 9 - i;
        sumSeq += (parseInt(numbers[i]) * seq);
      }
      return this.accountModule(sumSeq, accountNumber);
    },

    accountModule: function(sumSeq, accountNumber) {
      var result = 11 - (sumSeq % 11);
      if(result === 10) {
        console.log("account == X " + accountNumber);
        return "X";
      } else {
        if (result === 11) {
          console.log("account == 0" + accountNumber);
          return "0";
        } else {
          return result.toString();
        }
      }
    },

    // Agency validation
    calculateAgency: function(agencyNumber) {
      var numbers = agencyNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        seq = 5 - i;
        sumSeq += (parseInt(numbers[i]) * seq);
      }
      return this.agencyModule(sumSeq, agencyNumber);
    },

    agencyModule: function(sumSeq, agencyNumber) {
      var module = sumSeq % 11;
      if(module === 10) {
        return "X";
      } else {
        return (11 - module).toString();
      }
    }

  };

  Moip.BancoDoBrasilCheckNumberCalculator = BancoDoBrasilCheckNumberCalculator();

})(window);