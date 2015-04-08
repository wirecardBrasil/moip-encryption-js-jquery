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
  var cc = Moip.CreditCard()
  cc.number = "4012001037141112";
  cc.cvc = "123";
  cc.expirationMonth = "05";
  cc.expirationYear = "18";

  describe(".hash", function() {
  
    it("succesfully generates hash", function() {
      Moip.publicKey = DEFAULT_PUBLIC_KEY;
    
      var hash = cc.hash();
      expect(hash).not.toBeUndefined();
      expect(hash).not.toBeNull();
    });
    
    it("returns null when public key set", function() {
      var hash = cc.hash();
      expect(hash).not.toBeNull();
    });
  
  });
  
});