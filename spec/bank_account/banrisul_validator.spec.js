describe("BanrisulValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "041",
      agencyNumber       : "2664",
      agencyCheckNumber  : "18",
      accountNumber      : "358507670",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("valid bank account", function(){
    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });
  });

  describe("validate agency number", function(){

    it("does NOT accept agency check less than two digits", function() {
      validBankAccountParams.agencyCheckNumber = "1";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'INVALID_AGENCY_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency check greater than two digits", function() {
      validBankAccountParams.agencyCheckNumber = "123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'INVALID_AGENCY_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc agency check number invalid", function() {
      validBankAccountParams.agencyCheckNumber = "03";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Número da agência não corresponde ao dígito da agência', code: 'AGENCY_CHECK_NUMBER_DONT_MATCH' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate account number", function(){

    it("does NOT accept account less than nine digits", function() {
      validBankAccountParams.accountNumber = "12345678";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than nine digits", function() {
      validBankAccountParams.accountNumber = "1234567890";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc account check number invalid", function() {
      validBankAccountParams.accountCheckNumber = "0";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Número da conta corrente não corresponde ao dígito da conta corrente', code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

});