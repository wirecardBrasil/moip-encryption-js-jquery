describe("BancoDoBrasilValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "002101695",
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

  });

});