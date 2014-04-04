describe('Moip.PaymentSender', function () {

  beforeEach(function () {
    this.moipServer = sinon.fakeServer.create();
    this.moipServer.respondWith('POST', 'http://localhost/v2/orders/ORD-XOM711VZRHL6/payments',
                                [200, {"Content-Type": "application/json"}, defaultPaymentResponse()]);

    setFixtures(encryptedForm());
  });

  afterEach(function () {
    this.moipServer.restore();
  });

  it('should send payment json to moip succesfully', function () {

    var jsonBuilder = new Moip.JsonBuilder();
    var payment = jsonBuilder.build('test-form');

    var paymentSender = new Moip.PaymentSender('http://localhost/v2');
    var result;
    paymentSender.postPayment('ORD-XOM711VZRHL6', payment, function (response) {
      result = JSON.parse(response);
    });

    this.moipServer.respond();

    expect(result).toBeDefined();
    expect(result.id).toBe('PAY-EVSFR4SN0DO3');
    expect(result.status).toBe('CANCELLED');
    expect(result.installmentCount).toBe(2);
    expect(result.fundingInstrument).toBeDefined();
    expect(result.fees).toBeDefined();
    expect(result.events).toBeDefined();
    expect(result._links).toBeDefined();
    expect(result.createdAt).toBe('2014-04-03T15:51:09-0300');
    expect(result.updatedAt).toBe('2014-04-03T15:51:11-0300');

  });

  it('should throw error when id doesn\'t belong to order/multiorder', function () {
    var jsonBuilder = new Moip.JsonBuilder();
    var payment = jsonBuilder.build('test-form');

    var paymentSender = new Moip.PaymentSender('http://localhost/v2');
    var result;

    expect(function () {
      paymentSender.postPayment('BLABLABLA', payment);
    }).toThrow('Unknown id [BLABLABLA],  doesn\'t belong to any order or multiorder.');
  });

});
