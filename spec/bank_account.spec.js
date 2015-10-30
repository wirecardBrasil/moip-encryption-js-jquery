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

    it("accepts a invalid bank account", function() {
      var callbacks = {
        valid: jasmine.createSpy(),
        invalid: jasmine.createSpy(),
      };
      buildInvalidBankAccount().validate(callbacks);
      expect(callbacks.invalid).toHaveBeenCalled();
      expect(callbacks.valid).not.toHaveBeenCalled();  
    });
  });

});