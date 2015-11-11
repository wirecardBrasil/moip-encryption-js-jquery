describe("ItauValidator", function() {

  var validBankAccountParams;
  var validBankAccount;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "341",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "01695",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });

  describe("validate account number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than five digits", function() {
      validBankAccountParams.accountNumber = "1234";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than five digits", function() {
      validBankAccountParams.accountNumber = "123456";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});