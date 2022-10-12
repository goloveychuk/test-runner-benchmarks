jest.mock('@testing-library/react', () => {
  const originalModule = jest.requireActual('@testing-library/react');
  const React = require('react');
  return {
    ...originalModule,
    render: (...args) => {
      if (!global.componentsArr) {
        global.componentsArr = [];
        for (let i = 0; i < 100_000; i++) {
          let node = document.createElement('div');
          node.setAttribute('class', `testtestasd${i}`);
          global.componentsArr.push(
            node,
            // originalModule.render(React.createElement('div', { className: `testtestasd${i}` })),
          );
        }
      }
      return originalModule.render(...args);
    },
  };
});
