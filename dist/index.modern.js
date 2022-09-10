import { createElement } from 'react';

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: 'flex flex-col items-center justify-center h-full w-full'
  }, createElement("div", {
    className: 'text-xl font-bold text-red-500'
  }, text));
};

export { ExampleComponent };
//# sourceMappingURL=index.modern.js.map
