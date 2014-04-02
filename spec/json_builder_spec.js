describe("Moip.JsonBuilder", function () {

  beforeEach(function () {
    setFixtures(encryptedForm());
  });

  it("should build a json from a valid form", function () {
    var jsonBuilder = new Moip.JsonBuilder();

    var result = jsonBuilder.build($('#test-form'));

    expect(result).toBeDefined();
    expect(result.installmentCount).toBe('2');
    expect(result.fundingInstrument).toBeDefined();
    expect(result.fundingInstrument.method).toBe('CREDIT_CARD');
    expect(result.fundingInstrument.creditCard).toBeDefined();
    expect(result.fundingInstrument.creditCard.number).toBe('PROTECTED');
    expect(result.fundingInstrument.creditCard.cvc).toBe('PROTECTED');
    expect(result.fundingInstrument.creditCard.expirationMonth).toBe('10');
    expect(result.fundingInstrument.creditCard.expirationYear).toBe('2020');
    expect(result.fundingInstrument.creditCard.holder).toBeDefined();
    expect(result.fundingInstrument.creditCard.holder.fullName).toBe('Jose Portador da Silva');
    expect(result.fundingInstrument.creditCard.holder.birthDate).toBe('1988-12-30');
    expect(result.fundingInstrument.creditCard.holder.taxDocument).toBeDefined();
    expect(result.fundingInstrument.creditCard.holder.taxDocument.type).toBe('CPF');
    expect(result.fundingInstrument.creditCard.holder.taxDocument.number).toBe('055443444320');
    expect(result.fundingInstrument.creditCard.holder.phone).toBeDefined();
    expect(result.fundingInstrument.creditCard.holder.phone.countryCode).toBe('55');
    expect(result.fundingInstrument.creditCard.holder.phone.areaCode).toBe('11');
    expect(result.fundingInstrument.creditCard.holder.phone.number).toBe('66778899');
  });

});
