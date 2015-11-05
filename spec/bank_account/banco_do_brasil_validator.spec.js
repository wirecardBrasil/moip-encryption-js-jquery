describe("BancoDoBrasilValidator", function() {

  var callbacks;
  var validBankAccount;

  beforeEach(function() { 
    callbacks = {
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    validBankAccount = new Moip.BankAccount({
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "002101695",
      accountCheckNumber : "6"
    });
  });

  describe("validate agency check number", function(){

    it("accepts a valid bank account", function() {
      validBankAccount.validate(callbacks);
      expect(callbacks.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency check empty", function() {
      validBankAccount.agencyCheckNumber = "";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'AGENCY_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency check greater than one digits", function() {
      validBankAccount.agencyCheckNumber = "12";
      validBankAccount.validate(callbacks);
      var expectedParams = {errors: [{ description: 'Dígito da agência inválido', code: 'AGENCY_CHECK_NUMBER' }] };
      expect(callbacks.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});