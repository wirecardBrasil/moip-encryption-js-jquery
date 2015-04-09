var DEFAULT_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----' +
'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsXkulsKdAQLMH/zjzTLf' +
'0lrbgulfb6ZShEtRpmDnyX93EQqPdez7LyptvQBeTC+0pN57rNcWen9ApdsIMsNr' +
'YHjNQf/kI4Ka7Xnlx0U/v7bW1D8teDoD5glBTXLjU8hRi7qlOpupiPx4ldSnK9Jj' +
'tYApWuZMiCpWh/YRAlNW/N+ffm7ulq6H2atmgd+OFB2SghpbRJkqJiLaNJW8UkaR' +
'oXLHkF5WJD/RPrCxsZztYJQThxLX5gBgZ12YG5+7G26Ad/mWkPqF0GLSkd1gcnbP' +
'vF9Nw3ckKaIvh4Q4Vp3XI1hLvX41lg9CBxPPHkiJwM1M1coF9xsMP7kpJ2eujMBd' +
'mwIDAQAB' +
'-----END PUBLIC KEY-----';

describe("CreditCard", function() {

  buildValidCard = function(){
    var cc = new Moip.CreditCard({
       number  : "4012001037141112",
       cvc     : "123",
       expMonth: "05",
       expYear : "18",
       pubKey  : DEFAULT_PUBLIC_KEY
    });
    return cc;
  }
 
  describe(".hash", function() {
  
    it("succesfully generates hash if all properties are given", function() {
      var cc = buildValidCard();
      var hash = cc.hash();
      expect(hash).not.toBeUndefined();
      expect(hash).not.toBeNull();
    });
    
    it("does not generate a hash if any property is missing", function() {
      var cc = buildValidCard();
      cc._setPubKey(null);
      expect(cc.hash()).toBeNull();
      
      cc = buildValidCard();
      cc._setNumber(null);
      expect(cc.hash()).toBeNull();
      
      cc = buildValidCard();
      cc._setCvc(null);
      expect(cc.hash()).toBeNull();
      
      cc = buildValidCard();
      cc._setExpMonth(null);
      expect(cc.hash()).toBeNull();

      cc = buildValidCard();
      cc._setExpYear(null);
      expect(cc.hash()).toBeNull();
    });
  });
  
  describe(".isValid", function() {
    it("accepts a valid card", function() {
      var cc = buildValidCard();
      expect(cc.isValid()).toEqual(true);
    });
  
    it("does NOT accept a card with an invalid number", function() {
     cc = buildValidCard();
     cc._setNumber("222222222222");
     expect(cc.isValid()).toBe(false);
    });
  
    it("does NOT accept a card with a past expiration date", function() {
      cc = buildValidCard();
      cc._setExpYear("2014")
      expect(cc.isValid()).toBe(false);
    });

    it("does NOT accept a card if any property is missing", function() {
      cc = buildValidCard();
      cc._setNumber(null);
      expect(cc.isValid()).toBe(false);

      cc = buildValidCard();
      cc._setCvc(null);
      expect(cc.isValid()).toBe(false);

      cc = buildValidCard();
      cc._setExpMonth(null);
      expect(cc.isValid()).toBe(false);

      cc = buildValidCard();
      cc._setExpYear(null);
      expect(cc.isValid()).toBe(false);
    });
  });
  
  describe(".cardType", function() {
    it("identifies the cardType", function() {
      var cc = buildValidCard();
      expect(cc.cardType()).toEqual('VISA');
    });
    
    it("does NOT identify the cardType if number is missing", function() {
      var cc = buildValidCard();
      cc._setNumber(null);
      expect(cc.cardType()).toBeNull();
    });
  });
  
  describe("property accessors", function() {
    it("provides access to all properties", function() {
      var cc = buildValidCard();
      expect(cc.number).toEqual('4012001037141112');
      expect(cc.cvc).toEqual('123');
      expect(cc.expMonth).toEqual('05');
      expect(cc.expYear).toEqual('18');
    });
  });
  
});