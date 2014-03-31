var DEFAULT_CREDIT_CARD = '4551870000000183';
var DEFAULT_CVV = '123';
var DEFAULT_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----' +
'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsXkulsKdAQLMH/zjzTLf' +
'0lrbgulfb6ZShEtRpmDnyX93EQqPdez7LyptvQBeTC+0pN57rNcWen9ApdsIMsNr' +
'YHjNQf/kI4Ka7Xnlx0U/v7bW1D8teDoD5glBTXLjU8hRi7qlOpupiPx4ldSnK9Jj' +
'tYApWuZMiCpWh/YRAlNW/N+ffm7ulq6H2atmgd+OFB2SghpbRJkqJiLaNJW8UkaR' +
'oXLHkF5WJD/RPrCxsZztYJQThxLX5gBgZ12YG5+7G26Ad/mWkPqF0GLSkd1gcnbP' +
'vF9Nw3ckKaIvh4Q4Vp3XI1hLvX41lg9CBxPPHkiJwM1M1coF9xsMP7kpJ2eujMBd' +
'mwIDAQAB' +
'-----END PUBLIC KEY-----';

function defaultForm() {

  var form =
      '<form method="post" action="#" id="test-form">' +
      '<input type="text" name="card-number" data-encrypted-input="card-number" value="' + DEFAULT_CREDIT_CARD + '"/>' +
      '<input type="text" name="cvv-number" data-encrypted-input="cvv-number" value="' + DEFAULT_CVV + '"/>' +
      '<input type="text" name="expiration-date-month" value="10"/>' +
      '<input type="text" name="expiration-date-year" value="2020"/>' +
      '<input type="submit" name="submit-button" value="Click"/>' +
      '</form>';

  return form;
}
