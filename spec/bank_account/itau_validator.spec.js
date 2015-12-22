describe("ItauValidator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      bankNumber         : "341",
      agencyNumber       : "2545",
      agencyCheckNumber  : "",
      accountNumber      : "02366",
      accountCheckNumber : "1",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });

  describe("validate account number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(bankAccount);
      expect(bankAccount.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than five digits", function() {
      bankAccount.accountNumber = "1234";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than five digits", function() {
      bankAccount.accountNumber = "123456";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc account check number invalid", function() {
      bankAccount.accountCheckNumber = "0";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = {errors: [{ description: 'Dígito da conta não corresponde ao número da conta preenchido', code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH' }] };
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});