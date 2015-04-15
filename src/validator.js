(function(window) {
    var Moip = window.Moip || {};
    window.Moip = Moip;

    function Validator() {
        if ( !( this instanceof Validator ) ) {
            return new Validator();
        }
    }

    Validator.prototype = {

        _eloBins : ["50670","50671","50672","50673","50674","50675","50676","50900","50901","50902",
                    "50903","50904","50905","50906","50907","401178","401179","431274","438935","451416",
                    "457393","457631","457632","504175","506699","506770","506771","506772","506773","506774",
                    "506775","506776","506777","506778","509080","509081","509082","509083","627780","636297"],
        _hiperBins : ["637095", "637612", "637599", "637609", "637568"],
        _hipercardBins: ["606282"],

        normalizeCardNumber: function(creditCardNumber) {
          if(! creditCardNumber){
            return creditCardNumber;
          }
          creditCardNumber += '';
          return creditCardNumber.replace(/[\s+|\.|\-]/g, '');
        },

        isValid: function(creditCardNumber) {
            var cardNumber = this.normalizeCardNumber(creditCardNumber);
            var cardType = Validator.prototype.cardType(cardNumber);
            if (!cardType){
                return false;
            } else if (cardType.brand === "HIPERCARD") {
                return true; // There's no validation for hipercard.
            } else {
                // Luhn algorithm: http://en.wikipedia.org/wiki/Luhn_algorithm
                var checksum = 0;
                for (var i=(2-(cardNumber.length % 2)); i<=cardNumber.length; i+=2) {
                    checksum += parseInt(cardNumber.charAt(i-1), 10);
                }
                // Analyze odd digits in even length strings or even digits in odd length strings.
                for (i=(cardNumber.length % 2) + 1; i<cardNumber.length; i+=2) {
                    var digit = parseInt(cardNumber.charAt(i-1), 10) * 2;
                    if (digit < 10) { checksum += digit; } else { checksum += (digit-9); }
                }
                if ((checksum % 10) === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        cardType: function(creditCardNumber, loose) {
            var that = this;
            var cardNumber = this.normalizeCardNumber(creditCardNumber);
            var brands = {
                    VISA:       { matches: function(cardNum){ return /^4\d{15}$/.test(cardNum); } },
                    MASTERCARD: { matches: function(cardNum){ return /^5[1-5]\d{14}$/.test(cardNum); } },
                    AMEX:       { matches: function(cardNum){ return /^3[4,7]\d{13}$/.test(cardNum); } },
                    DINERS:     { matches: function(cardNum){ return /^3[0,6,8]\d{12}$/.test(cardNum); } },
                    HIPERCARD:  { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length == 16 &&
                                            that._hipercardBins.indexOf(cardNum.substring(0,6)) > -1;
                                } },
                    ELO:        { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length == 16 &&
                                            ( that._eloBins.indexOf(cardNum.substring(0,6)) > -1 ||
                                              that._eloBins.indexOf(cardNum.substring(0,5)) > -1 );
                                } },
                    HIPER:      { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length >= 6 &&
                                            that._hiperBins.indexOf(cardNum.substring(0,6)) > -1;
                                } }

                },
                // for non-strict detections
                looseBrands = {
                    VISA:       { matches: function(cardNum){ return /^4\d{3}\d*$/.test(cardNum); } },
                    MASTERCARD: { matches: function(cardNum){ return /^5[1-5]\d{4}\d*$/.test(cardNum); } },
                    AMEX:       { matches: function(cardNum){ return /^3[4,7]\d{2}\d*$/.test(cardNum); } },
                    DINERS:     { matches: function(cardNum){ return /^3(?:0[0-5]|[68][0-9])+\d*$/.test(cardNum); } },
                    HIPERCARD:  { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length >= 6 &&
                                            that._hipercardBins.indexOf(cardNum.substring(0,6)) > -1;
                                } },
                    ELO:        { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length >= 6 &&
                                            ( that._eloBins.indexOf(cardNum.substring(0,6)) > -1 ||
                                              that._eloBins.indexOf(cardNum.substring(0,5)) > -1 );
                                } },
                    HIPER:      { matches: function(cardNum){
                                    return  cardNum !== null &&
                                            cardNum.length >= 6 &&
                                            that._hiperBins.indexOf(cardNum.substring(0,6)) > -1;
                                } }

                };

            if (loose) {
                brands = looseBrands;
            }

            // order is mandatory:
            // a) VISA is identified by the broad prefix '4', shadowing more specific ELO prefixes
            // b) HIPERCARD has precendence over DINERS for prefix 3841 (loose check)
            if (brands.ELO.matches(cardNumber))          { return {brand:'ELO'}; }
            if (brands.HIPER.matches(cardNumber))        { return {brand:'HIPER'}; }
            if (brands.VISA.matches(cardNumber))         { return {brand:'VISA'}; }
            if (brands.MASTERCARD.matches(cardNumber))   { return {brand:'MASTERCARD'}; }
            if (brands.AMEX.matches(cardNumber))         { return {brand:'AMEX'}; }
            if (brands.HIPERCARD.matches(cardNumber))    { return {brand:'HIPERCARD'}; }
            if (brands.DINERS.matches(cardNumber))                { return {brand:'DINERS'}; }

            return null;
        },

        isSecurityCodeValid: function(creditCardNumber, csc) {
            var type = Moip.Validator.cardType(creditCardNumber);
            if (!type){
              return false;
            }
            
            var digits = (type.brand === "AMEX") ? 4 : 3;
            var regExp = new RegExp('[0-9]{' + digits + '}');
            return (csc.length === digits && regExp.test(csc));
        },

        isExpiryDateValid: function(month, year) {
            month = parseInt(month, 10);
            year = parseInt(year, 10);

            if(month < 1 || month > 12) {
                return false;
            }
            if((year+'').length !== 2 && (year+'').length !== 4) {
                return false;
            }
            if((year+'').length === 2) {
                if(year > 80) {
                    year = "19" + year;
                } else {
                    year = "20" + year;
                }
            }
            if(year < 1000 || year >= 3000) {
                return false;
            }
            return !Validator.prototype.isExpiredDate(month, year);
        },

        isExpiredDate: function(month, year) {
            var now = new Date();
            var thisMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var thisYear = now.getFullYear();

            month = ("0" + (month)).slice(-2);
            if(year.toString().length === 2) {
                if(year > 80) {
                    return true;
                } else {
                    year = "20" + year;
                }
            }
            var currentDate = thisYear + thisMonth;
            var customerDate = year + month;
            return parseInt(customerDate, 10) < parseInt(currentDate, 10);
        }
    };

    Moip.Validator = Validator();

})(window);