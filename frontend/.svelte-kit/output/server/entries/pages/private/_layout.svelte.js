import "clsx";
function _layout($$payload, $$props) {
  let { data, children } = $$props;
  $$payload.out += `<main>`;
  children($$payload);
  $$payload.out += `<!----></main>`;
}
export {
  _layout as default
};
