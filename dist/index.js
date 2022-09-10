var React = require('react');

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return React.createElement("div", {
    className: 'flex flex-col items-center justify-center h-full w-full'
  }, React.createElement("div", {
    className: 'text-xl font-bold text-red-500'
  }, text));
};

exports.ExampleComponent = ExampleComponent;
//# sourceMappingURL=index.js.map
