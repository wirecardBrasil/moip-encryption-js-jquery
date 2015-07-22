# Moip v2 SDK JavaScript

## Exemplo

Veja nossa página de exemplo utilizando o JavaScript de criptografia de cartão [clicando aqui](http://moip.github.io/moip-sdk-js/).

## Build do projeto

### Testes unitários
``` javascript
%> grunt
```

### Build
``` javascript
%> grunt build
```

### Release (bump version & upload)
``` javascript
%> grunt release:minor
```

## O que é o Moip JS?

É uma biblioteca javascript para auxiliar a integração com a API Moip.

## É preciso instalar?
Não. O arquivo javascript é públicado em [http://assets.moip.com.br/v2].
A versão mais recente é [http://assets.moip.com.br/v2/moip.min.js].
Porém, é recomendado que um release especifico seja referenciado, por exemplo [http://assets.moip.com.br/v2/moip-2.0.0.min.js].

## Criptografar um cartão de crédito
```html
<script type="text/javascript">
$(document).ready(function() {
  $("#pay_cc").click(function() {
    var cc = new Moip.CreditCard({
      number  : $("#cc_number").val(),
      cvc     : $("#cc_cvc").val(),
      expMonth: $("#cc_exp_month").val(),
      expYear : $("#cc_exp_year").val(),
      pubKey  : $("#public_key").val()
    });
    if( cc.isValid()){
      $("#hash").val(cc.hash());
    } else {
      $("#hash").val('');
      alert('Invalid credit card. Verify parameters: number, cvc, expiration Month, expiration Year');
      return false; // Don't submit the form
    }
  });
});
</script>
<form>
    <input type="text" placeholder="Credit card number" id="cc_number" value="4012001037141112" />
    <input type="text" placeholder="CVC" id="cc_cvc" value="123" />
    <input type="text" placeholder="Month" id="cc_exp_month" value="12" />
    <input type="text" placeholder="Year" id="cc_exp_year" value="18" />
    <textarea id="public_key">-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoBttaXwRoI1Fbcond5mS
7QOb7X2lykY5hvvDeLJelvFhpeLnS4YDwkrnziM3W00UNH1yiSDU+3JhfHu5G387
O6uN9rIHXvL+TRzkVfa5iIjG+ap2N0/toPzy5ekpgxBicjtyPHEgoU6dRzdszEF4
ItimGk5ACx/lMOvctncS5j3uWBaTPwyn0hshmtDwClf6dEZgQvm/dNaIkxHKV+9j
Mn3ZfK/liT8A3xwaVvRzzuxf09xJTXrAd9v5VQbeWGxwFcW05oJulSFjmJA9Hcmb
DYHJT+sG2mlZDEruCGAzCVubJwGY1aRlcs9AQc1jIm/l8JwH7le2kpk3QoX+gz0w
WwIDAQAB
-----END PUBLIC KEY-----</textarea>
    <textarea id="encrypted_value"></textarea>
    <input type="text" placeholder="Card Type" id="card_type"/>
    <input type="button" value="encrypt" id="encrypt" />
</form>
```

## Validar um número de cartão de crédito

Para todas as validações é retornado um boolean se a condição é valida ou não. Veja abaixo algumas validações possíveis com o moip.js

### Validando apenas o número de cartão
``` javascript
Moip.Validator.isValid("4111111111111111");    //return true
Moip.Validator.isValid("4111 1111-1111.1111"); //return true
Moip.Validator.isValid("1919191919191919");    //return false
Moip.Validator.isValid("41111");               //return false
```
Possíveis retornos:
* true ou false

### Validando cartão com código de segurança
``` javascript
Moip.Validator.isSecurityCodeValid("5105105105105100", "123");    //return true
Moip.Validator.isSecurityCodeValid("5105105105105100", "12");     //return false
```
Possíveis retornos:
* true ou false

### Identificando a bandeira de um cartão
``` javascript
Moip.Validator.cardType("5105105105105100");    //return [Object]MASTERCARD
Moip.Validator.cardType("4111111111111111");    //return [Object]VISA
Moip.Validator.cardType("341111111111111");     //return [Object]AMEX
moip.Validator.cardType("30569309025904");      //return [Object]DINERS
Moip.Validator.cardType("3841001111222233334"); //return [Object]HIPERCARD
Moip.Valditor.cardType("4514160123456789");    //return [Object]ELO
Moip.Valditor.cardType("6370950000000005");    //return [Object]HIPER
Moip.Validator.cardType("9191919191919191");    //return [Object]null
```
Possíveis retornos:
Object: [brand]
 * MASTERCARD
 * VISA
 * AMEX
 * DINERS
 * HIPERCARD
 * ELO
 * HIPER

### Verificado se a data de expiração do cartão
``` javascript
Moip.Validator.isExpiryDateValid("10", "2020");    //return true
Moip.Validator.isExpiryDateValid("10", "2000");    //return false

//Usando objeto Date
var now = new Date();
var isExpiryDateValid = Moip.Validator.isExpiryDateValid(now.getMonth()+1+"", now.getYear()+1900+""); // return true
```
Possíveis retornos:
* true ou false
