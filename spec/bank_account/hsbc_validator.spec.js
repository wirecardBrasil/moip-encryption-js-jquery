describe("HSBCValidator", function() {

  var callbacks;
  var validBankAccount;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "399",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "12345678901",
      accountCheckNumber : "98"
    });
  });

  describe("validate agency check number", function(){

    it("accepts a valid bank account", function() {
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than eleven digits", function() {
      validBankAccount.accountNumber = "1234567890";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than eleven digits", function() {
      validBankAccount.accountNumber = "123456789012";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account check less than two digits", function() {
      validBankAccount.accountCheckNumber = "1";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'ACCOUNT_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account check greater than two digits", function() {
      validBankAccount.accountCheckNumber = "123";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'ACCOUNT_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

});