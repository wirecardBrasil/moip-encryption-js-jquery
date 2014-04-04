describe("Moip.FormEncryptor", function () {

  beforeEach(function () {

    setFixtures(defaultForm());
    this.moip = Moip.create({ publicKey: DEFAULT_PUBLIC_KEY });

    $('#test-form').submit(function (e) {
      e.preventDefault();
    });
  });

  it("should encrypt form using jquery", function () {

    this.moip.onSubmit('ORD-XOM711VZRHL6', $('#test-form'));
    $('#test-form').submit();

    expect($('input[type="hidden"][name="fundingInstrument[creditCard][number]"]')).toExist();
    expect($('input[type="hidden"][name="fundingInstrument[creditCard][number]"]').val()).not.toEqual(DEFAULT_CREDIT_CARD);

    expect($('input[type="hidden"][name="fundingInstrument[creditCard][cvc]"]')).toExist();
    expect($('input[type="hidden"][name="fundingInstrument[creditCard][cvc]"]').val()).not.toEqual(DEFAULT_CVV);
  });

  it("should encrypt form using element id", function () {

    this.moip.onSubmit('ORD-XOM711VZRHL6', 'test-form');
    $('#test-form').submit();

    expect($('input[type="hidden"][name="fundingInstrument[creditCard][number]"]')).toExist();
    expect($('input[type="hidden"][name="fundingInstrument[creditCard][number]"]').val()).not.toEqual(DEFAULT_CREDIT_CARD);

    expect($('input[type="hidden"][name="fundingInstrument[creditCard][cvc]"]')).toExist();
    expect($('input[type="hidden"][name="fundingInstrument[creditCard][cvc]"]').val()).not.toEqual(DEFAULT_CVV);
  });
});
