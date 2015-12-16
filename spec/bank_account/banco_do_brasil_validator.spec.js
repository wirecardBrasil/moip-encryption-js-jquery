describe("BancoDoBrasilValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "00210169",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });

  describe("validate agency check number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency check empty", function() {
      validBankAccountParams.agencyCheckNumber = "";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'INVALID_AGENCY_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency check greater than one digits", function() {
      validBankAccountParams.agencyCheckNumber = "12";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'INVALID_AGENCY_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc agency check number invalid", function() {
      validBankAccountParams.agencyCheckNumber = "3";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Número da agência não corresponde ao dígito da agência', code: 'AGENCY_CHECK_NUMBER_DONT_MATCH' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc account check number invalid", function() {
      validBankAccountParams.accountCheckNumber = "8";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Número da conta corrente não corresponde ao dígito da conta corrente', code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});