describe("CitibankValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "075",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "12345678",
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

    it("does NOT accept account less than eight digits", function() {
      validBankAccountParams.accountNumber = "1234567";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than eight digits", function() {
      validBankAccountParams.accountNumber = "123456789";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});