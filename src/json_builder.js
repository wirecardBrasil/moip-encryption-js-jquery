Moip.JsonBuilder = function () {

  var formExtractor = new Moip.FormExtractor();

  var processAttributeName = function (name) {

    var multilevelAttributeRegex = /\[([a-zA-Z0-9]+)\]/;
    var items = name.split(multilevelAttributeRegex);
    var result = [];

    if (items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i]) {
          result.push(items[i]);
        }
      }
    }

    return result;
  };

  var setProperty = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length-1;
    for (var i = 0; i < lastKeyIndex; ++ i) {
      var key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }

      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  var buildJson = function (inputs) {
    var result = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.hasAttribute('data-input')) {
        setProperty(result, processAttributeName(input.getAttribute('data-input')), input.value);
      } else if (input.getAttribute('type') === 'hidden') {
        setProperty(result, processAttributeName(input.getAttribute('name')), input.value);
      }
    }

    return result;
  };

  this.build = function (form) {
    var formToConvert = formExtractor.findForm(form);
    var inputs = formExtractor.extractInputs(formToConvert, true);
    return buildJson(inputs);
  };
};
