describe("Moip", function () {

  beforeEach(function () {
    this.validForm = defaultForm();
  });

  it("should encrypt form", function () {

    var moip = Moip.create({ publicKey: DEFAULT_PUBLIC_KEY });
    moip.onSubmit(this.validForm, function (e) {
      console.log('Executing custom callback');
      e.preventDefault();
    });

    this.validForm.submit();

    var cardNumberInput = this.validForm.elements['card-number'];
    alert(cardNumberInput.getAttribute('value'));
    expect(cardNumberInput.getAttribute('value')).not.toEqual(DEFAULT_CREDIT_CARD);

  });
});
