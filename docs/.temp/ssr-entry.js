"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const react = require("react");
const server = require("react-dom/server");
function Layout() {
  const [count, setCount] = react.useState(0);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "This is Layout Component"), /* @__PURE__ */ React.createElement("div", null, count, /* @__PURE__ */ React.createElement("button", { onClick: () => setCount(count + 1) }, "Add Count")));
}
function App() {
  return /* @__PURE__ */ React.createElement(Layout, null);
}
function render() {
  return server.renderToString(/* @__PURE__ */ React.createElement(App, null));
}
exports.render = render;
