describe("BancoDoBrasilCheckNumberCalculator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      agencyNumber        : "1584",
      agencyCheckNumber   : "9",
      accountNumber       : "00210169",
      accountCheckNumber  : "6"
    };

    bankAccountModuleTen = {
      agencyNumber        : "6841",
      agencyCheckNumber   : "X",
    };

    bankAccountResultTen = {
      accountNumber       : "10089934",
      accountCheckNumber  : "X"
    };

    bankAccountResultEleven = {
      accountNumber       : "10089939",
      accountCheckNumber  : "0"
    };

  });

  describe("validate BancoDoBrasil agency number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.agencyCheckNumber);
    });

    it("should correctly calculate the check number when module equal ten", function() {
      checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAgency(bankAccountModuleTen.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleTen.agencyCheckNumber);
    });

  });

  describe("validate BancoDoBrasil account number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number when result equal ten", function() {
      checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccountResultTen.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountResultTen.accountCheckNumber);
    });

    it("should correctly calculate the check number when result equal eleven", function() {
      checkNumberCalculated = Moip.BancoDoBrasilCheckNumberCalculator.calculateAccount(bankAccountResultEleven.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountResultEleven.accountCheckNumber);
    });
  });

});