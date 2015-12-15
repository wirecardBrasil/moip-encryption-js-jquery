(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BanrisulCheckNumberCalculator() {
    if ( !( this instanceof BanrisulCheckNumberCalculator ) ) {
      return new BanrisulCheckNumberCalculator();
    }
  }

  BanrisulCheckNumberCalculator.prototype = {

    // Account validation
    calculateAccount: function(accountNumber) {
      var numbers = accountNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        var number = parseInt(numbers[i]);
        sumSeq += this.multiplyAccordingWeight(number, i);
      }
      return this.moduleAccount(sumSeq);
    },

    multiplyAccordingWeight: function(number, i) {
      var weight = [3,2,4,7,6,5,4,3,2];
      return number * weight[i];
    },

    moduleAccount: function(sumSeq) {
      var module = sumSeq % 11;
      if(module === 0) {
        return "0";
      } else {
        if (module === 1) {
          return "6";
        } else {
          return (11 - module).toString();
        }
      }
    },

    // Agency validation
    calculateAgency: function(agencyNumber) {
      var numbers = agencyNumber.split("");
      var firstDigit = this.firstAgencyDigit(numbers);
      var secondDigit = this.secondAgencyDigit(numbers, firstDigit);
      return firstDigit + secondDigit;
    },

    firstAgencyDigit: function(agencyNumbers) {
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < agencyNumbers.length; i++) {
        var number = parseInt(agencyNumbers[i]);
        sequence = this.multiplyAccordingParity(number, i);
        sequence = this.adjustAccordingLength(sequence);
        sumSeq += sequence;
      }
      return this.moduleAgencyFirstDigit(sumSeq);
    },

    secondAgencyDigit: function(agencyNumbers, firstDigit) {
      agencyNumbers.push(firstDigit);
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < agencyNumbers.length; i++) {
        seq = 6 - i;
        sumSeq += (parseInt(agencyNumbers[i]) * seq);
      }
      var module = this.moduleAgencySecondDigit(sumSeq);
      if (module === "1") {
        if (firstDigit != 9) {
          firstDigit += 1;
        } else {
          firstDigit = 0;
        }
        this.secondAgencyDigit(agencyNumbers, firstDigit);
      }
      return module;
    },

    multiplyAccordingParity: function(number, index) {
      return number * (index % 2 === 0 ? 1 : 2);
    },

    adjustAccordingLength: function(sequence) {
      if(sequence > 9) {
        var numbers = sequence.toString().split("");
        sequence = 0;
        for (var i = 0; i < numbers.length; i++) {
          sequence += parseInt(numbers[i]);
        }
      }
      return sequence;
    },

    moduleAgencyFirstDigit: function(sumSeq) {
      var module = sumSeq % 10;
      if(module === 0) {
        return "0";
      } else {
        return (10 - module).toString();
      }
    },

    moduleAgencySecondDigit: function(sumSeq) {
      var module = sumSeq % 11;
      if(module === 0) {
        return "0";
      } else {
        if (module === 1) {
          return "1";
        } else {
          return (11 - module).toString();
        }
      }
    }

  };

  Moip.BanrisulCheckNumberCalculator = BanrisulCheckNumberCalculator();

})(window);