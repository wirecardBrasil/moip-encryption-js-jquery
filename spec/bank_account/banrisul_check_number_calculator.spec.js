describe("BanrisulCheckNumberCalculator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      agencyNumber        : "2664",
      agencyCheckNumber   : "18",
      accountNumber       : "924999007",
      accountCheckNumber  : "8"
    };

    bankAccountModuleZero = {
      agencyNumber        : "2301",
      agencyCheckNumber   : "03",
      accountNumber       : "844330944",
      accountCheckNumber  : "0"
    };

    bankAccountModuleOne = {
      agencyNumber        : "9913",
      agencyCheckNumber   : "51",
      accountNumber       : "252893678",
      accountCheckNumber  : "6"
    };

    bankAccountFirstDigitModuleZero = {
      agencyNumber        : "1453",
      accountNumber       : "32552",
      agencyCheckNumber   : "00"
    };

    bankAccountModuleOneAndDigitNine = {
      agencyNumber        : "9708",
      accountNumber       : "32552",
      agencyCheckNumber   : "91"
    };

    bankAccountModuleOneAndDigitDiffNine = {
      agencyNumber        : "3671",
      accountNumber       : "32552",
      agencyCheckNumber   : "51"
    };
  });

  describe("validate Banrisul agency number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.agencyCheckNumber);
    });

    it("should correctly calculate when first digit module equal zero ", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccountFirstDigitModuleZero.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountFirstDigitModuleZero.agencyCheckNumber);
    });

    it("should correctly calculate when module equal zero", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccountModuleZero.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.agencyCheckNumber);
    });

    it("should correctly calculate when module equal one", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccountModuleOne.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOne.agencyCheckNumber);
    });

    it("should correctly calculate when second module equal one and first equal nine", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccountModuleOneAndDigitNine.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOneAndDigitNine.agencyCheckNumber);
    });

    it("should correctly calculate when second module equal one and first diff nine", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAgency(bankAccountModuleOneAndDigitDiffNine.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOneAndDigitDiffNine.agencyCheckNumber);
    });
  });

  describe("validate Banrisul account number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number when module equal zero", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAccount(bankAccountModuleZero.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.accountCheckNumber);
    });

    it("should correctly calculate the check number when module equal one", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculateAccount(bankAccountModuleOne.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOne.accountCheckNumber);
    });
  });

});