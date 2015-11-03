describe("BankAccount", function() {

  buildValidBankAccount = function(){
    var bankAccountParams = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "00210169",
      accountCheckNumber : "6"
    });
    return bankAccountParams;
  }

  buildInvalidBankAccount = function(){
    var bankAccountParams = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1",
      agencyCheckNumber  : "",
      accountNumber      : "000",
      accountCheckNumber : ""
    });
    return bankAccountParams;
  }

  describe(".validate", function(){

    it("accepts a valid bank account", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      buildValidBankAccount().validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
      expect(callbacks.invalid).not.toHaveBeenCalled();  
    });

    it("does NOT accept a invalid bank account", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      buildInvalidBankAccount().validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();  
    });
  });

  describe("validate agency", function(){

    it("accepts a agency starts with zero", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      var validBankAccount = buildValidBankAccount();
      validBankAccount.agencyNumber = "0170";
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
      expect(callbacks.invalid).not.toHaveBeenCalled();
    });

    it("does NOT accept agency with letters", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      var validBankAccount = buildValidBankAccount();
      validBankAccount.agencyNumber = "AAAA";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();
    });

    it("does NOT accept agency equal zero", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      var validBankAccount = buildValidBankAccount();
      validBankAccount.agencyNumber = "0000";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();
    });

    it("does NOT accept agency less than four numbers", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      var validBankAccount = buildValidBankAccount();
      validBankAccount.agencyNumber = "170";
      validBankAccount.validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();
    });

  });

});