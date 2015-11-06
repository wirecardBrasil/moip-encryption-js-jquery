describe("HSBCValidator", function() {

  var validBankAccountParams;
  var validBankAccount;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "399",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "12345678901",
      accountCheckNumber : "98",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency check number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than eleven digits", function() {
      validBankAccountParams.accountNumber = "1234567890";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than eleven digits", function() {
      validBankAccountParams.accountNumber = "123456789012";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account check less than two digits", function() {
      validBankAccountParams.accountCheckNumber = "1";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'INVALID_ACCOUNT_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account check greater than two digits", function() {
      validBankAccountParams.accountCheckNumber = "123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'INVALID_ACCOUNT_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

});