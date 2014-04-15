Moip.FormExtractor = function () {

  this.findForm = function (form) {
    if (window.jQuery && form instanceof jQuery) {
      return form[0];
    } else if (form.nodeType && form.nodeType === 1) {
      return form;
    }

    return document.getElementById(form);
  };

  this.extractInputs = function (form, includeHidden) {
    var extractHidden = includeHidden || false;
    var inputs = [];
    var children = form.children;

    for (var i = 0; i < children.length; i++) {
      var input = children[i];

      if (input.nodeType === 1 && (input.attributes['data-encrypted-input'] || input.attributes['data-input'])) {
        inputs.push(input);
      } else if (input.getAttribute('type') === 'hidden' && extractHidden) {
        inputs.push(input);
      } else if (input.children && input.children.length > 0) {
        inputs = inputs.concat(this.extractInputs(input));
      }
    }

    return inputs;
  };
};
