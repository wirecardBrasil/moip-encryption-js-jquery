describe("BankAccount", function() {

  var callbacks;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "00210169",
      accountCheckNumber : "6"
    });

    invalidBankAccount = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1",
      agencyCheckNumber  : "",
      accountNumber      : "000",
      accountCheckNumber : ""
    });
  });

  describe(".validate", function(){

    it("accepts a valid bank account", function() {
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
      expect(callbacks.invalid).not.toHaveBeenCalled();
    });

    it("does NOT accept a invalid bank account", function() {
      invalidBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();
    });

    it("accepts a valid bank number", function() {
      validBankAccount.bankNumber = "999";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
      expect(callbacks.invalid).not.toHaveBeenCalled();
    });

    it("does NOT accept a invalid bank number", function() {
      validBankAccount.bankNumber = "1";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Banco inválido', code: 'BANK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
      expect(callbacks.valid).not.toHaveBeenCalled();
    });
  });

});