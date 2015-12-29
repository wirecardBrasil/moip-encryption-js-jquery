describe("CitibankValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "075",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "1234567",
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
      validBankAccountParams.accountNumber = "123456";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than eight digits", function() {
      validBankAccountParams.accountNumber = "12345678";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 7 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate agency number", function(){

    it("does NOT accept invalid agency", function() {
      validBankAccountParams.agencyNumber = "123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

});