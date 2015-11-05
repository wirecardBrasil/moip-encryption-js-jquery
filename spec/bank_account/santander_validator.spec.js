describe("SantanderValidator", function() {

  var callbacks;
  var validBankAccount;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "033",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "123456789012",
      accountCheckNumber : "6"
    });
  });

  describe("validate account number", function(){

    it("accepts a valid bank account", function() {
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than twelve digits", function() {
      validBankAccount.accountNumber = "12345678901";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than twelve digits", function() {
      validBankAccount.accountNumber = "1234567890123";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});