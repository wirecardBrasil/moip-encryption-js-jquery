describe("GenericBankAccountValidator", function() {

  var callbacks;
  var validBankAccount;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "719",
      agencyNumber       : "15849",
      agencyCheckNumber  : "9",
      accountNumber      : "0210169",
      accountCheckNumber : "6"
    });
  });

  describe("validate agency", function(){

    it("accepts a agency starts with zero", function() {
      validBankAccount.agencyNumber = "0170";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts agency with one number", function() {
      validBankAccount.agencyNumber = "8";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts agency with five numbers", function() {
      validBankAccount.agencyNumber = "97817";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency with letters", function() {
      validBankAccount.agencyNumber = "AAAA";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency equal zero", function() {
      validBankAccount.agencyNumber = "0";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency with six numbers", function() {
      validBankAccount.agencyNumber = "197817";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'INVALID_AGENCY_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate agency check number", function(){

    it("accepts a valid agency check number", function() {
      validBankAccount.agencyCheckNumber = "9";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check with letters", function() {
      validBankAccount.agencyCheckNumber = "A";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check empty", function() {
      validBankAccount.agencyCheckNumber = "";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check equal zero", function() {
      validBankAccount.agencyCheckNumber = "0";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid agency check with two digits", function() {
      validBankAccount.agencyCheckNumber = "22";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency greater than two digits", function() {
      validBankAccount.agencyCheckNumber = "123";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'INVALID_AGENCY_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate account", function(){

    it("accepts a valid account number", function() {
      validBankAccount.accountNumber = "123456789012";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts account with one number", function() {
      validBankAccount.accountNumber = "8";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept account with letters", function() {
      validBankAccount.accountNumber = "AAAAA";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account equal zero", function() {
      validBankAccount.accountNumber = "0";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than twelve numbers", function() {
      validBankAccount.accountNumber = "1234567890123";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Conta corrente inválida', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate account check number", function(){

    it("accepts a valid account check number", function() {
      validBankAccount.accountCheckNumber = "9";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check with letters", function() {
      validBankAccount.accountCheckNumber = "A";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check empty", function() {
      validBankAccount.accountCheckNumber = "";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check equal zero", function() {
      validBankAccount.accountCheckNumber = "0";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check with two digits", function() {
      validBankAccount.accountCheckNumber = "22";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept account greater than two digits", function() {
      validBankAccount.accountCheckNumber = "123";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'INVALID_ACCOUNT_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });
});