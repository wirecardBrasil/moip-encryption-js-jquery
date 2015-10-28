describe("BankAccount", function() {

  buildValidBankAccount = function(){
    var bankAccount = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "00210169",
      accountCheckNumber : "6"
    });
    return bankAccount;
  }

  describe(".isValid", function(){
    it("accepts a valid bank account", function() {
      var bankAccount = buildValidBankAccount();
      expect(bankAccount.isValid()).toEqual(true);
    });
  });
    
});