describe("Validator", function() {

  describe(".isValid", function(){
    it("validates numeric format", function() {
      var valid = Moip.Validator.isValid(4111111111111111);
      expect(valid).toBe(true);
    });
    
    it("validates string format", function() {
      var valid = Moip.Validator.isValid("4111111111111111");
      expect(valid).toBe(true);
    });
    
    it("validates format w/ whitespace", function() {
      var valid = Moip.Validator.isValid("4111 1111 1111 1111");
      expect(valid).toBe(true);
    });
    
    it("validates format w/ dash", function() {
      var valid = Moip.Validator.isValid("4111-1111-1111-1111");
      expect(valid).toBe(true);
    });
    
    it("validates format w/ dot", function() {
      var valid = Moip.Validator.isValid("4111.1111.1111.1111");
      expect(valid).toBe(true);
    });
    
    it("recognizes an invalid number (Luhn)", function() {
      var valid = Moip.Validator.isValid(222222222222);
     expect(valid).toBe(false);
    });
  });

  describe(".isExpiredDate", function(){
    it("recognizes an expired date (long format)", function() {
      var valid = Moip.Validator.isExpiredDate(5, 2013);
      expect(valid).toBe(true);
    });

    it("recognizes an expired date (short format)", function() {
      var valid = Moip.Validator.isExpiredDate(5, 98);
      expect(valid).toBe(true);
    });

    it("recognizes a future date)", function() {
      var valid = Moip.Validator.isExpiredDate(1, 42);
      expect(valid).toBe(false);
    });
  });

  describe(".isExpiryDateValid", function(){
    it("recognizes a valid date (numeric format)", function(){
      var valid = Moip.Validator.isExpiryDateValid(5, 42);
      expect(valid).toBe(true);
    });

    it("recognizes a valid date (non numeric format)", function(){
      var valid = Moip.Validator.isExpiryDateValid("5", "42");
      expect(valid).toBe(true);
    });
      
    it("recognizes an invalid date (expired)", function(){
      var valid = Moip.Validator.isExpiryDateValid(5, 98);
      expect(valid).toBe(false);
    });
    
    it("recognizes an invalid date (non numeric format)", function(){
      var valid = Moip.Validator.isExpiryDateValid("ab", "cd");
      expect(valid).toBe(false);
    });
  });

  describe(".cardType", function(){
  
    describe("[strict mode]", function(){
      var assertCard = function(expected) {
        return function(bin) {
          var card = Moip.Validator.cardType(bin);
          expect(card).toEqual(expected);    
        }
      }

      it("recognizes VISA", function(){
        var card = Moip.Validator.cardType("4111111111111111")
        var expected = {brand : 'VISA'}
        expect(card).toEqual(expected);
      });
      
      it("recognizes MASTERCARD", function(){
        var card = Moip.Validator.cardType("5105105105105100")
        var expected = {brand : 'MASTERCARD'}
        expect(card).toEqual(expected);
      });
      
      it("recognizes AMEX", function(){
        var card = Moip.Validator.cardType("341111111111111")
        var expected = {brand : 'AMEX'}
        expect(card).toEqual(expected);
      });
      
      it("recognizes DINERS", function(){
        var card = Moip.Validator.cardType("36263526914736")
        var expected = {brand : 'DINERS'}
        expect(card).toEqual(expected);
      });

      it("recognizes ELO", function(){
        assertElo = assertCard({brand : 'ELO'});

        assertElo("4514160123456789");
        assertElo("5067700123456789");
        assertElo("5099990123456789");
        assertElo("6500320123456789");
        assertElo("6550210123456789");
      });

      it("recognizes HIPER", function(){
        var card = Moip.Validator.cardType("6370950000000005")
        var expected = {brand : 'HIPER'}
        expect(card).toEqual(expected);
      });

      it("recognizes MASTERCARD new range", function(){
        assertMaster = assertCard({brand : 'MASTERCARD'});

        assertMaster("2221002857319036");
        assertMaster("2572098765432123");
        assertMaster("2720793872642452");
      });
    });


    describe("[loose mode]", function(){
      var assertCard = function(expected) {
        return function(bin) {
          var card = Moip.Validator.cardType(bin, true);
          expect(card).toEqual(expected);
        }
      }

      it("recognizes VISA", function(){
        var card = Moip.Validator.cardType("411111", true)
        var expected = {brand : 'VISA'}
        expect(card).toEqual(expected);
      });

      it("recognizes MASTERCARD", function(){
        var card = Moip.Validator.cardType("510510", true)
        var expected = {brand : 'MASTERCARD'}
        expect(card).toEqual(expected);
      });

      it("recognizes AMEX", function(){
        var card = Moip.Validator.cardType("341111", true)
        var expected = {brand : 'AMEX'}
        expect(card).toEqual(expected);
      });

      it("recognizes DINERS", function(){
        var card = Moip.Validator.cardType("305693", true)
        var expected = {brand : 'DINERS'}
        expect(card).toEqual(expected);
      });

      it("recognizes ELO", function(){
        assertElo = assertCard({brand : 'ELO'});

        assertElo("451416");
        assertElo("506770");
        assertElo("509999");
        assertElo("650032");
        assertElo("655021");
      });

      it("recognizes HIPER", function(){
        var card = Moip.Validator.cardType("637095", true)
        var expected = {brand : 'HIPER'}
        expect(card).toEqual(expected);
      });

      it("recognizes MASTERCARD new range", function(){
        assertMaster = assertCard({brand : 'MASTERCARD'});

        assertMaster("2221001231231232");
        assertMaster("2572093213213213");
        assertMaster("2720994564564566");
      })
    });
  });
    
  describe(".isSecurityCodeValid", function(){
    it("recognizes a valid 3 digit cvv", function(){
      var valid = Moip.Validator.isSecurityCodeValid("5105105105105100", "123");
      expect(valid).toBe(true);
    });
    
    it("recognizes an invalid 4 digit cvv", function(){
      var valid = Moip.Validator.isSecurityCodeValid("5105105105105100", "1234");
      expect(valid).toBe(false);
    });
    
    it("recognizes a valid 4 digit cvv (AMEX)", function(){
      var valid = Moip.Validator.isSecurityCodeValid("341111111111111", "1234");
      expect(valid).toBe(true);
    });
  });
    
});