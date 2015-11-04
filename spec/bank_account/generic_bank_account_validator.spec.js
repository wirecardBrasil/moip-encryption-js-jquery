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
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'AGENCY_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency equal zero", function() {
      validBankAccount.agencyNumber = "0";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'AGENCY_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency with six numbers", function() {
      validBankAccount.agencyNumber = "197817";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'AGENCY_NUMBER' }] };
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
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'AGENCY_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalled();
    });

  });
});