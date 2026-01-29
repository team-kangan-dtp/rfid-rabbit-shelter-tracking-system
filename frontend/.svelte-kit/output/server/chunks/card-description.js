import { d as spread_attributes, f as clsx, h as bind_props, p as pop, a as push } from "./index2.js";
import { c as cn } from "./button.js";
function Card_description($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<p${spread_attributes(
    {
      "data-slot": "card-description",
      class: clsx(cn("text-muted-foreground text-sm", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></p>`;
  bind_props($$props, { ref });
  pop();
}
export {
  Card_description as C
};
