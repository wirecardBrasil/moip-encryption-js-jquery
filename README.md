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
Não. O arquivo javascript é publicado em [http://assets.moip.com.br/v2].
A versão mais recente é [http://assets.moip.com.br/v2/moip.min.js].
Porém, é recomendado que um release especifico seja referenciado, por exemplo [http://assets.moip.com.br/v2/moip-2.6.1.min.js].

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

### Verificando a data de expiração do cartão
``` javascript
Moip.Validator.isExpiryDateValid("10", "2020");    //return true
Moip.Validator.isExpiryDateValid("10", "2000");    //return false

//Usando objeto Date
var now = new Date();
var isExpiryDateValid = Moip.Validator.isExpiryDateValid(now.getMonth()+1+"", now.getYear()+1900+""); // return true
```
Possíveis retornos:
* true ou false

---
## Validação de conta bancária
A validação da conta bancária é realizada sobre as regras dos seguintes bancos: Itaú, Bradesco, Banco do Brasil, Santander, Citibank, HSBC e Banrisul. Para os outros bancos é realizada uma validação padrão:
 * Agência de 1 até 5 números
 * Dígito da agência de 0 a 2 caracteres
 * Conta corrente de 1 até 12 números
 * Dígito da conta corrente de 0 a 2 caracteres

#### Validação através do dígito verificador
O número da agência e conta corrente dos bancos Itaú, Bradesco, Banrisul e Banco do Brasil são validados através do cálculo do dígito verificador (semelhante a validação do CPF).

#### Códigos e mensagens de erro para o banco Itaú, por exemplo:
 * INVALID_BANK_NUMBER: Banco inválido
 * INVALID_AGENCY_NUMBER: A agência deve conter 4 números. Complete com zeros a esquerda se necessário
 * INVALID_AGENCY_CHECK_NUMBER: Dígito da agência inválido
 * INVALID_ACCOUNT_NUMBER: A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário
 * INVALID_ACCOUNT_CHECK_NUMBER: Dígito da conta corrente inválido
 * AGENCY_CHECK_NUMBER_DONT_MATCH: Dígito da agência não corresponde ao número da agência preenchido
 * ACCOUNT_CHECK_NUMBER_DONT_MATCH: Dígito da conta não corresponde ao número da conta/agência preenchido


```html
<script type="text/javascript">
  $(document).ready(function() {
    $("#validate_bank_account").click(function() {
      Moip.BankAccount.validate({
        bankNumber         : $("#bank_number").val(),
        agencyNumber       : $("#agency_number").val(),
        agencyCheckNumber  : $("#agency_check_number").val(),
        accountNumber      : $("#account_number").val(),
        accountCheckNumber : $("#account_check_number").val(),
        valid: function() {
          alert("Conta bancária válida")
        },
        invalid: function(data) {
          var errors = "Conta bancária inválida: \n";
          for(i in data.errors){
            errors += data.errors[i].description + "-" + data.errors[i].code + ")\n";
          }
          alert(errors);
        }
      });
    });
  });
</script>
<form>
  <select id="bank_number">
    <option value="001">BANCO DO BRASIL S.A.</option>
    <option value="237">BANCO BRADESCO S.A.</option>
    <option value="341">BANCO ITAÚ S.A.</option>
    <option value="104">CAIXA ECONOMICA FEDERAL</option>
    <option value="033">BANCO SANTANDER BANESPA S.A.</option>
    <option value="399">HSBC BANK BRASIL S.A.</option>
    <option value="151">BANCO NOSSA CAIXA S.A.</option>
    <option value="745">BANCO CITIBANK S.A.</option>
  </select>

  <input id="agency_number" placeholder="Agência" type="text"/>
  <input id="agency_check_number" placeholder="Dígito da agência" type="text" />
  <input id="account_number" placeholder="Conta corrente" type="text" />
  <input id="account_check_number" placeholder="Dígito da conta corrente" type="text" />

  <input type="button" value="Validar" id="validate_bank_account" />
</form>
```

A lista de códigos/números dos bancos pode ser obtida em: http://www.codigobanco.com.
