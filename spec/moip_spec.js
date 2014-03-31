describe("Moip", function () {

  beforeEach(function () {

    setFixtures(defaultForm());
    this.moip = Moip.create({ publicKey: DEFAULT_PUBLIC_KEY });

    $('#test-form').submit(function (e) {
      e.preventDefault();
    });
  });

  it("should encrypt form using jquery", function () {

    this.moip.onSubmit($('#test-form'));
    $('#test-form').submit();

    expect($('input[type="hidden"][name="card-number"]')).toExist();
    expect($('input[type="hidden"][name="card-number"]').val()).not.toEqual(DEFAULT_CREDIT_CARD);

    expect($('input[type="hidden"][name="cvv-number"]')).toExist();
    expect($('input[type="hidden"][name="cvv-number"]').val()).not.toEqual(DEFAULT_CVV);
  });

  it("should encrypt form using element id", function () {

    this.moip.onSubmit('test-form');
    $('#test-form').submit();

    expect($('input[type="hidden"][name="card-number"]')).toExist();
    expect($('input[type="hidden"][name="card-number"]').val()).not.toEqual(DEFAULT_CREDIT_CARD);

    expect($('input[type="hidden"][name="cvv-number"]')).toExist();
    expect($('input[type="hidden"][name="cvv-number"]').val()).not.toEqual(DEFAULT_CVV);
  });
});
