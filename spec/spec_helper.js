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
  var form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '#');

  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'card-number');
  input.setAttribute('data-encrypted-input', 'card-number');
  input.setAttribute('value', DEFAULT_CREDIT_CARD);

  form.appendChild(input);

  input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'cvv-number');
  input.setAttribute('data-encrypted-input', 'cvv-number');
  input.setAttribute('value', DEFAULT_CVV);

  form.appendChild(input);

  input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'expiration-date-month');
  input.setAttribute('data-encrypted-input', 'expiration-date-month');
  input.setAttribute('value', '10');

  form.appendChild(input);

  input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'expiration-date-year');
  input.setAttribute('data-encrypted-input', 'expiration-date-year');
  input.setAttribute('value', '2020');

  form.appendChild(input);

  return form;
}
