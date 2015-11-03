describe("CommonBankAccountValidator", function() {

  var callbacks;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "341",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "0210169",
      accountCheckNumber : "6"
    });
  });

  describe("validate agency", function(){

    it("accepts a valid agency number", function() {
      validBankAccount.agencyNumber = "0170";
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
      validBankAccount.agencyNumber = "0000";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
    });

    it("does NOT accept agency less than four numbers", function() {
      validBankAccount.agencyNumber = "170";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
    });

    it("does NOT accept agency greater than four numbers", function() {
      validBankAccount.agencyNumber = "11708";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
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

    it("does NOT accept agency greater than one digits", function() {
      validBankAccount.agencyCheckNumber = "12";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Agência inválida', code: 'AGENCY_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalled();
    });

  });
});