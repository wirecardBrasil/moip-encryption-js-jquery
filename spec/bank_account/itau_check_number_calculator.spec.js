describe("ItauValidator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      agencyNumber       : "2545",
      accountNumber      : "02366",
      accountCheckNumber : "1"
    };
  });

  describe("validate Itaú account number", function() {

    it("should correctly calculate the check number", function() {
      accountCheckNumber = Moip.ItauCheckNumberCalculator.calculate(bankAccount.agencyNumber, bankAccount.accountNumber);
      expect(accountCheckNumber).toEqual(bankAccount.accountCheckNumber);
    });
  });

});