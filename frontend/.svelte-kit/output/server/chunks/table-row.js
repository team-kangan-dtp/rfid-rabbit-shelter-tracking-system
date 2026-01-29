import { a as push, e as escape_html, c as spread_props, p as pop, d as spread_attributes, f as clsx, h as bind_props } from "./index2.js";
import "clsx";
import { createTable } from "@tanstack/table-core";
import { c as cn } from "./button.js";
class RenderComponentConfig {
  component;
  props;
  constructor(component, props = {}) {
    this.component = component;
    this.props = props;
  }
}
class RenderSnippetConfig {
  snippet;
  params;
  constructor(snippet, params) {
    this.snippet = snippet;
    this.params = params;
  }
}
function Flex_render($$payload, $$props) {
  push();
  let { content, context } = $$props;
  if (typeof content === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(content)}`;
  } else if (content instanceof Function) {
    $$payload.out += "<!--[1-->";
    const result = content(context);
    if (result instanceof RenderComponentConfig) {
      $$payload.out += "<!--[-->";
      const { component: Component, props } = result;
      $$payload.out += `<!---->`;
      Component($$payload, spread_props([props]));
      $$payload.out += `<!---->`;
    } else if (result instanceof RenderSnippetConfig) {
      $$payload.out += "<!--[1-->";
      const { snippet, params } = result;
      snippet($$payload, params);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(result)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function createSvelteTable(options) {
  const resolvedOptions = mergeObjects(
    {
      state: {},
      onStateChange() {
      },
      renderFallbackValue: null,
      mergeOptions: (defaultOptions, options2) => {
        return mergeObjects(defaultOptions, options2);
      }
    },
    options
  );
  const table = createTable(resolvedOptions);
  let state = table.initialState;
  function updateOptions() {
    table.setOptions((prev) => {
      return mergeObjects(prev, options, {
        state: mergeObjects(state, options.state || {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStateChange: (updater) => {
          if (updater instanceof Function) state = updater(state);
          else state = mergeObjects(state, updater);
          options.onStateChange?.(updater);
        }
      });
    });
  }
  updateOptions();
  return table;
}
function mergeObjects(...sources) {
  const resolve = (src) => typeof src === "function" ? src() ?? void 0 : src;
  const findSourceWithKey = (key) => {
    for (let i = sources.length - 1; i >= 0; i--) {
      const obj = resolve(sources[i]);
      if (obj && key in obj) return obj;
    }
    return void 0;
  };
  return new Proxy(/* @__PURE__ */ Object.create(null), {
    get(_, key) {
      const src = findSourceWithKey(key);
      return src?.[key];
    },
    has(_, key) {
      return !!findSourceWithKey(key);
    },
    ownKeys() {
      const all = /* @__PURE__ */ new Set();
      for (const s of sources) {
        const obj = resolve(s);
        if (obj) {
          for (const k of Reflect.ownKeys(obj)) {
            all.add(k);
          }
        }
      }
      return [...all];
    },
    getOwnPropertyDescriptor(_, key) {
      const src = findSourceWithKey(key);
      if (!src) return void 0;
      return {
        configurable: true,
        enumerable: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: src[key],
        writable: true
      };
    }
  });
}
function Table($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div data-slot="table-container" class="relative w-full overflow-x-auto"><table${spread_attributes(
    {
      "data-slot": "table",
      class: clsx(cn("w-full caption-bottom text-sm", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></table></div>`;
  bind_props($$props, { ref });
  pop();
}
function Table_body($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<tbody${spread_attributes(
    {
      "data-slot": "table-body",
      class: clsx(cn("[&_tr:last-child]:border-0", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></tbody>`;
  bind_props($$props, { ref });
  pop();
}
function Table_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<td${spread_attributes(
    {
      "data-slot": "table-cell",
      class: clsx(cn("whitespace-nowrap bg-clip-padding p-2 align-middle [&:has([role=checkbox])]:pr-0", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></td>`;
  bind_props($$props, { ref });
  pop();
}
function Table_head($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<th${spread_attributes(
    {
      "data-slot": "table-head",
      class: clsx(cn("text-foreground h-10 whitespace-nowrap bg-clip-padding px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></th>`;
  bind_props($$props, { ref });
  pop();
}
function Table_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<thead${spread_attributes(
    {
      "data-slot": "table-header",
      class: clsx(cn("[&_tr]:border-b", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></thead>`;
  bind_props($$props, { ref });
  pop();
}
function Table_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<tr${spread_attributes(
    {
      "data-slot": "table-row",
      class: clsx(cn("hover:[&,&>svelte-css-wrapper]:[&>th,td]:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></tr>`;
  bind_props($$props, { ref });
  pop();
}
export {
  Flex_render as F,
  Table as T,
  Table_header as a,
  Table_row as b,
  createSvelteTable as c,
  Table_head as d,
  Table_body as e,
  Table_cell as f
};
