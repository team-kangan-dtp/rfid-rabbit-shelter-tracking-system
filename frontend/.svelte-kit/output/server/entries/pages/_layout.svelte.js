import { Z as setContext, z as getContext, v as derived, d as spread_attributes, f as clsx, h as bind_props, p as pop, a as push, w as props_id, b as attr, c as spread_props, e as escape_html, x as copy_payload, y as assign_payload, a2 as DEV, s as stringify, _ as attr_class, aa as head, ab as store_get, j as ensure_array_like, ac as unsubscribe_stores, t as element, a3 as hasContext, a1 as run, a9 as attr_style } from "../../chunks/index2.js";
import { g as goto } from "../../chunks/client.js";
import { o as onDestroy } from "../../chunks/index-server.js";
import "clsx";
import { c as cn$1, B as Button } from "../../chunks/button.js";
import { b as createId, d as box, m as mergeProps, a as attachRef, w as watch, c as createBitsAttrs, g as getDataDisabled, h as getDataOpenClosed, i as getAriaExpanded, C as getDataOrientation, p as getAriaHidden, D as getAriaOrientation, z as getDataSelected, B as getAriaSelected, x as getAriaDisabled, E as srOnlyStyles, r as executeCallbacks, I as Input } from "../../chunks/create-id.js";
import "style-to-object";
import { C as Context$1, O as OpenChangeComplete, S as SPACE, E as ENTER, h as afterTick, n as noop, d as Presence_layer, u as useId, x as getFirstNonCommentChild, o as END, H as HOME, r as ARROW_LEFT, A as ARROW_UP, y as h, z as k, B as p, s as ARROW_RIGHT, j as ARROW_DOWN, G as l, I as j, J as n, f as afterSleep, t as isHTMLElement, g as getWindow, K as getDocument, i as isElement, e as DOMContext, L as StateMachine, M as isFocusVisible, P as Portal } from "../../chunks/scroll-lock.js";
import { o as on } from "../../chunks/events.js";
import { c as SelectGroupState, d as boxAutoReset, R as Root$3, S as Select_trigger, a as Select_content, b as Select_item } from "../../chunks/index5.js";
import { h as isFunction, j as FloatingArrowState, b as Floating_layer, P as Popper_layer_force_mount, a as Popper_layer, g as getFloatingContentCSSVars, F as Floating_layer_anchor, S as Search } from "../../chunks/search.js";
import { M as MediaQuery, c as createSubscriber } from "../../chunks/index-server2.js";
import { tv } from "tailwind-variants";
import { I as Icon } from "../../chunks/Icon.js";
import { e as DialogTriggerState, f as Dialog_overlay, g as Dialog_content, h as Dialog_close, X, i as Dialog_title, j as Dialog_description, k as Dialog, R as Root$2, D as Dialog_content$1, a as Dialog_header, b as Dialog_title$1, c as Dialog_description$1, d as Dialog_footer } from "../../chunks/check.js";
import { C as Chevron_right, a as Chevron_left, R as Root$4, P as Popover_trigger, b as Popover_content } from "../../chunks/index4.js";
import { s as setInitialMode, m as modeStorageKey, a as themeStorageKey, d as darkClassNames, l as lightClassNames, b as disableTransitions, c as themeColors, e as synchronousModeChanges, f as defineConfig, U as User, L as Log_out, T as Textarea, g as derivedMode } from "../../chunks/textarea.js";
import { R as Rabbit } from "../../chunks/rabbit.js";
import { p as page$1 } from "../../chunks/index3.js";
import { s as supabase } from "../../chunks/supabaseClient.js";
import { L as Label } from "../../chunks/label.js";
import { s as snapshot } from "../../chunks/clone.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const DEFAULT_MOBILE_BREAKPOINT = 768;
class IsMobile extends MediaQuery {
  constructor(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
    super(`max-width: ${breakpoint - 1}px`);
  }
}
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
class SidebarState {
  props;
  #open = derived(() => this.props.open());
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  openMobile = false;
  setOpen;
  #isMobile;
  #state = derived(() => this.open ? "expanded" : "collapsed");
  get state() {
    return this.#state();
  }
  set state($$value) {
    return this.#state($$value);
  }
  constructor(props) {
    this.setOpen = props.setOpen;
    this.#isMobile = new IsMobile();
    this.props = props;
  }
  // Convenience getter for checking if the sidebar is mobile
  // without this, we would need to use `sidebar.isMobile.current` everywhere
  get isMobile() {
    return this.#isMobile.current;
  }
  // Event handler to apply to the `<svelte:window>`
  handleShortcutKeydown = (e) => {
    if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.toggle();
    }
  };
  setOpenMobile = (value) => {
    this.openMobile = value;
  };
  toggle = () => {
    return this.#isMobile.current ? this.openMobile = !this.openMobile : this.setOpen(!this.open);
  };
}
const SYMBOL_KEY = "scn-sidebar";
function setSidebar(props) {
  return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}
function useSidebar() {
  return getContext(Symbol.for(SYMBOL_KEY));
}
function Sidebar_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      class: clsx(cn$1("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      class: clsx(cn$1("flex flex-col gap-2 p-2", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      class: clsx(cn$1("w-full text-sm", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group_label($$payload, $$props) {
  push();
  let {
    ref = null,
    children,
    child,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const mergedProps = {
    class: cn$1("text-sidebar-foreground/70 ring-sidebar-ring outline-hidden flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    ...restProps
  };
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      class: clsx(cn$1("relative flex w-full min-w-0 flex-col p-2", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      class: clsx(cn$1("flex flex-col gap-2 p-2", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_inset($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<main${spread_attributes(
    {
      "data-slot": "sidebar-inset",
      class: clsx(cn$1("bg-background relative flex w-full flex-1 flex-col", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></main>`;
  bind_props($$props, { ref });
  pop();
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    if (gotten === void 0) return defaultValue;
    return gotten;
  }
  if (value === void 0) return defaultValue;
  return value;
}
function useDebounce(callback, wait) {
  let context = null;
  const wait$ = extract(wait, 250);
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = {
        timeout: null,
        runner: null,
        promise,
        resolve,
        reject
      };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, wait$);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
class IsMounted {
  #isMounted = false;
  constructor() {
  }
  get current() {
    return this.#isMounted;
  }
}
function onDestroyEffect(fn) {
}
function Dialog_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = DialogTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const collapsibleAttrs = createBitsAttrs({
  component: "collapsible",
  parts: ["root", "content", "trigger"]
});
const CollapsibleRootContext = new Context$1("Collapsible.Root");
class CollapsibleRootState {
  static create(opts) {
    return CollapsibleRootContext.set(new CollapsibleRootState(opts));
  }
  opts;
  attachment;
  contentNode = null;
  contentId = void 0;
  constructor(opts) {
    this.opts = opts;
    this.toggleOpen = this.toggleOpen.bind(this);
    this.attachment = attachRef(this.opts.ref);
    new OpenChangeComplete({
      ref: box.with(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": getDataOpenClosed(this.opts.open.current),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    [collapsibleAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleContentState {
  static create(opts) {
    return new CollapsibleContentState(opts, CollapsibleRootContext.get());
  }
  opts;
  root;
  attachment;
  #present = derived(() => this.opts.forceMount.current || this.root.opts.open.current);
  get present() {
    return this.#present();
  }
  set present($$value) {
    return this.#present($$value);
  }
  #originalStyles;
  #isMountAnimationPrevented = false;
  #width = 0;
  #height = 0;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.#isMountAnimationPrevented = root.opts.open.current;
    this.root.contentId = this.opts.id.current;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
    watch.pre(() => this.opts.id.current, (id) => {
      this.root.contentId = id;
    });
    watch(
      [
        () => this.opts.ref.current,
        () => this.present
      ],
      ([node]) => {
        if (!node) return;
        afterTick(() => {
          if (!this.opts.ref.current) return;
          this.#originalStyles = this.#originalStyles || {
            transitionDuration: node.style.transitionDuration,
            animationName: node.style.animationName
          };
          node.style.transitionDuration = "0s";
          node.style.animationName = "none";
          const rect = node.getBoundingClientRect();
          this.#height = rect.height;
          this.#width = rect.width;
          if (!this.#isMountAnimationPrevented) {
            const { animationName, transitionDuration } = this.#originalStyles;
            node.style.transitionDuration = transitionDuration;
            node.style.animationName = animationName;
          }
        });
      }
    );
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      "--bits-collapsible-content-height": this.#height ? `${this.#height}px` : void 0,
      "--bits-collapsible-content-width": this.#width ? `${this.#width}px` : void 0
    },
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    [collapsibleAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleTriggerState {
  static create(opts) {
    return new CollapsibleTriggerState(opts, CollapsibleRootContext.get());
  }
  opts;
  root;
  attachment;
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.#isDisabled()) return;
    if (e.button !== 0) return e.preventDefault();
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.toggleOpen();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    type: "button",
    disabled: this.#isDisabled(),
    "aria-controls": this.root.contentId,
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    [collapsibleAttrs.trigger]: "",
    //
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Collapsible$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    open = false,
    disabled = false,
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = CollapsibleRootState.create({
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    }),
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    onOpenChangeComplete: box.with(() => onOpenChangeComplete)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, open });
  pop();
}
function Collapsible_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    ref = null,
    forceMount = false,
    children,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = CollapsibleContentState.create({
    id: box.with(() => id),
    forceMount: box.with(() => forceMount),
    ref: box.with(() => ref, (v) => ref = v)
  });
  {
    let presence = function($$payload2, { present }) {
      const mergedProps = mergeProps(restProps, contentState.props, { hidden: forceMount ? void 0 : !present });
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          ...contentState.snippetProps,
          props: mergedProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      forceMount: true,
      open: contentState.present,
      ref: contentState.opts.ref,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Collapsible_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = CollapsibleTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => disabled)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Arrow($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    width = 10,
    height = 5,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const mergedProps = mergeProps(restProps, { id });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps }, null)}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<svg${attr("width", width)}${attr("height", height)} viewBox="0 0 30 10" preserveAspectRatio="none" data-arrow=""><polygon points="0,0 30,0 15,10" fill="currentColor"></polygon></svg>`;
    }
    $$payload.out += `<!--]--></span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Floating_layer_arrow($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const arrowState = FloatingArrowState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, arrowState.props);
  Arrow($$payload, spread_props([mergedProps]));
  bind_props($$props, { ref });
  pop();
}
const separatorAttrs = createBitsAttrs({ component: "separator", parts: ["root"] });
class SeparatorRootState {
  static create(opts) {
    return new SeparatorRootState(opts);
  }
  opts;
  attachment;
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: this.opts.decorative.current ? "none" : "separator",
    "aria-orientation": getAriaOrientation(this.opts.orientation.current),
    "aria-hidden": getAriaHidden(this.opts.decorative.current),
    "data-orientation": getDataOrientation(this.opts.orientation.current),
    [separatorAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Separator$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    child,
    children,
    decorative = false,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = SeparatorRootState.create({
    ref: box.with(() => ref, (v) => ref = v),
    id: box.with(() => id),
    decorative: box.with(() => decorative),
    orientation: box.with(() => orientation)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_group$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupState = SelectGroupState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function findNextSibling(el, selector) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.nextElementSibling;
  }
}
function findPreviousSibling(el, selector) {
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.previousElementSibling;
  }
}
function cssEscape(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  const length = value.length;
  let index = -1;
  let codeUnit;
  let result = "";
  const firstCodeUnit = value.charCodeAt(0);
  if (length === 1 && firstCodeUnit === 45)
    return "\\" + value;
  while (++index < length) {
    codeUnit = value.charCodeAt(index);
    if (codeUnit === 0) {
      result += "�";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is U+007F
      codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || // If the character is the first character and is in the range [0-9] (U+0030 to U+0039)
      index === 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9] (U+0030 to U+0039)
      // and the first character is a `-` (U+002D)
      index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45
    ) {
      result += "\\" + codeUnit.toString(16) + " ";
      continue;
    }
    if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
      result += value.charAt(index);
      continue;
    }
    result += "\\" + value.charAt(index);
  }
  return result;
}
const COMMAND_VALUE_ATTR = "data-value";
const commandAttrs = createBitsAttrs({
  component: "command",
  parts: [
    "root",
    "list",
    "input",
    "separator",
    "loading",
    "empty",
    "group",
    "group-items",
    "group-heading",
    "item",
    "viewport",
    "input-label"
  ]
});
const COMMAND_GROUP_SELECTOR = commandAttrs.selector("group");
const COMMAND_GROUP_ITEMS_SELECTOR = commandAttrs.selector("group-items");
const COMMAND_GROUP_HEADING_SELECTOR = commandAttrs.selector("group-heading");
const COMMAND_ITEM_SELECTOR = commandAttrs.selector("item");
const COMMAND_VALID_ITEM_SELECTOR = `${commandAttrs.selector("item")}:not([aria-disabled="true"])`;
const CommandRootContext = new Context$1("Command.Root");
const CommandListContext = new Context$1("Command.List");
const CommandGroupContainerContext = new Context$1("Command.Group");
const defaultState = {
  /** Value of the search query */
  search: "",
  /** Currently selected item value */
  value: "",
  filtered: {
    /** The count of all visible items. */
    count: 0,
    /** Map from visible item id to its search store. */
    items: /* @__PURE__ */ new Map(),
    /** Set of groups with at least one visible item. */
    groups: /* @__PURE__ */ new Set()
  }
};
class CommandRootState {
  static create(opts) {
    return CommandRootContext.set(new CommandRootState(opts));
  }
  opts;
  attachment;
  #updateScheduled = false;
  #isInitialMount = true;
  sortAfterTick = false;
  sortAndFilterAfterTick = false;
  allItems = /* @__PURE__ */ new Set();
  allGroups = /* @__PURE__ */ new Map();
  allIds = /* @__PURE__ */ new Map();
  // attempt to prevent the harsh delay when user is typing fast
  key = 0;
  viewportNode = null;
  inputNode = null;
  labelNode = null;
  // published state that the components and other things can react to
  commandState = defaultState;
  // internal state that we mutate in batches and publish to the `state` at once
  _commandState = defaultState;
  #snapshot() {
    return snapshot(this._commandState);
  }
  #scheduleUpdate() {
    if (this.#updateScheduled) return;
    this.#updateScheduled = true;
    afterTick(() => {
      this.#updateScheduled = false;
      const currentState = this.#snapshot();
      const hasStateChanged = !Object.is(this.commandState, currentState);
      if (hasStateChanged) {
        this.commandState = currentState;
        this.opts.onStateChange?.current?.(currentState);
      }
    });
  }
  setState(key, value, preventScroll) {
    if (Object.is(this._commandState[key], value)) return;
    this._commandState[key] = value;
    if (key === "search") {
      this.#filterItems();
      this.#sort();
    } else if (key === "value") {
      if (!preventScroll) this.#scrollSelectedIntoView();
    }
    this.#scheduleUpdate();
  }
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    const defaults = {
      ...this._commandState,
      value: this.opts.value.current ?? ""
    };
    this._commandState = defaults;
    this.commandState = defaults;
    this.onkeydown = this.onkeydown.bind(this);
  }
  /**
   * Calculates score for an item based on search text and keywords.
   * Higher score = better match.
   *
   * @param value - Item's display text
   * @param keywords - Optional keywords to boost scoring
   * @returns Score from 0-1, where 0 = no match
   */
  #score(value, keywords) {
    const filter = this.opts.filter.current ?? computeCommandScore;
    const score = value ? filter(value, this._commandState.search, keywords) : 0;
    return score;
  }
  /**
   * Sorts items and groups based on search scores.
   * Groups are sorted by their highest scoring item.
   * When no search active, selects first item.
   */
  #sort() {
    if (!this._commandState.search || this.opts.shouldFilter.current === false) {
      this.#selectFirstItem();
      return;
    }
    const scores = this._commandState.filtered.items;
    const groups = [];
    for (const value of this._commandState.filtered.groups) {
      const items = this.allGroups.get(value);
      let max = 0;
      if (!items) {
        groups.push([value, max]);
        continue;
      }
      for (const item of items) {
        const score = scores.get(item);
        max = Math.max(score ?? 0, max);
      }
      groups.push([value, max]);
    }
    const listInsertionElement = this.viewportNode;
    const sorted = this.getValidItems().sort((a, b) => {
      const valueA = a.getAttribute("data-value");
      const valueB = b.getAttribute("data-value");
      const scoresA = scores.get(valueA) ?? 0;
      const scoresB = scores.get(valueB) ?? 0;
      return scoresB - scoresA;
    });
    for (const item of sorted) {
      const group = item.closest(COMMAND_GROUP_ITEMS_SELECTOR);
      if (group) {
        const itemToAppend = item.parentElement === group ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
        if (itemToAppend) {
          group.appendChild(itemToAppend);
        }
      } else {
        const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
        if (itemToAppend) {
          listInsertionElement?.appendChild(itemToAppend);
        }
      }
    }
    const sortedGroups = groups.sort((a, b) => b[1] - a[1]);
    for (const group of sortedGroups) {
      const element2 = listInsertionElement?.querySelector(`${COMMAND_GROUP_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(group[0])}"]`);
      element2?.parentElement?.appendChild(element2);
    }
    this.#selectFirstItem();
  }
  /**
   * Sets current value and triggers re-render if cleared.
   *
   * @param value - New value to set
   */
  setValue(value, opts) {
    if (value !== this.opts.value.current && value === "") {
      afterTick(() => {
        this.key++;
      });
    }
    this.setState("value", value, opts);
    this.opts.value.current = value;
  }
  /**
   * Selects first non-disabled item on next tick.
   */
  #selectFirstItem() {
    afterTick(() => {
      const item = this.getValidItems().find((item2) => item2.getAttribute("aria-disabled") !== "true");
      const value = item?.getAttribute(COMMAND_VALUE_ATTR);
      const shouldPreventScroll = this.#isInitialMount && this.opts.disableInitialScroll.current;
      this.setValue(value ?? "", shouldPreventScroll);
      this.#isInitialMount = false;
    });
  }
  /**
   * Updates filtered items/groups based on search.
   * Recalculates scores and filtered count.
   */
  #filterItems() {
    if (!this._commandState.search || this.opts.shouldFilter.current === false) {
      this._commandState.filtered.count = this.allItems.size;
      return;
    }
    this._commandState.filtered.groups = /* @__PURE__ */ new Set();
    let itemCount = 0;
    for (const id of this.allItems) {
      const value = this.allIds.get(id)?.value ?? "";
      const keywords = this.allIds.get(id)?.keywords ?? [];
      const rank = this.#score(value, keywords);
      this._commandState.filtered.items.set(id, rank);
      if (rank > 0) itemCount++;
    }
    for (const [groupId, group] of this.allGroups) {
      for (const itemId of group) {
        const currItem = this._commandState.filtered.items.get(itemId);
        if (currItem && currItem > 0) {
          this._commandState.filtered.groups.add(groupId);
          break;
        }
      }
    }
    this._commandState.filtered.count = itemCount;
  }
  /**
   * Gets all non-disabled, visible command items.
   *
   * @returns Array of valid item elements
   * @remarks Exposed for direct item access and bound checking
   */
  getValidItems() {
    const node = this.opts.ref.current;
    if (!node) return [];
    const validItems = Array.from(node.querySelectorAll(COMMAND_VALID_ITEM_SELECTOR)).filter((el) => !!el);
    return validItems;
  }
  /**
   * Gets all visible command items.
   *
   * @returns Array of valid item elements
   * @remarks Exposed for direct item access and bound checking
   */
  getVisibleItems() {
    const node = this.opts.ref.current;
    if (!node) return [];
    const visibleItems = Array.from(node.querySelectorAll(COMMAND_ITEM_SELECTOR)).filter((el) => !!el);
    return visibleItems;
  }
  /** Returns all visible items in a matrix structure
   *
   * @remarks Returns empty if the command isn't configured as a grid
   *
   * @returns
   */
  get itemsGrid() {
    if (!this.isGrid) return [];
    const columns = this.opts.columns.current ?? 1;
    const items = this.getVisibleItems();
    const grid = [[]];
    let currentGroup = items[0]?.getAttribute("data-group");
    let column = 0;
    let row = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemGroup = item?.getAttribute("data-group");
      if (currentGroup !== itemGroup) {
        currentGroup = itemGroup;
        column = 1;
        row++;
        grid.push([{ index: i, firstRowOfGroup: true, ref: item }]);
      } else {
        column++;
        if (column > columns) {
          row++;
          column = 1;
          grid.push([]);
        }
        grid[row]?.push({
          index: i,
          firstRowOfGroup: grid[row]?.[0]?.firstRowOfGroup ?? i === 0,
          ref: item
        });
      }
    }
    return grid;
  }
  /**
   * Gets currently selected command item.
   *
   * @returns Selected element or undefined
   */
  #getSelectedItem() {
    const node = this.opts.ref.current;
    if (!node) return;
    const selectedNode = node.querySelector(`${COMMAND_VALID_ITEM_SELECTOR}[data-selected]`);
    if (!selectedNode) return;
    return selectedNode;
  }
  /**
   * Scrolls selected item into view.
   * Special handling for first items in groups.
   */
  #scrollSelectedIntoView() {
    afterTick(() => {
      const item = this.#getSelectedItem();
      if (!item) return;
      const grandparent = item.parentElement?.parentElement;
      if (!grandparent) return;
      if (this.isGrid) {
        const isFirstRowOfGroup = this.#itemIsFirstRowOfGroup(item);
        item.scrollIntoView({ block: "nearest" });
        if (isFirstRowOfGroup) {
          const closestGroupHeader = item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR);
          closestGroupHeader?.scrollIntoView({ block: "nearest" });
          return;
        }
      } else {
        const firstChildOfParent = getFirstNonCommentChild(grandparent);
        if (firstChildOfParent && firstChildOfParent.dataset?.value === item.dataset?.value) {
          const closestGroupHeader = item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR);
          closestGroupHeader?.scrollIntoView({ block: "nearest" });
          return;
        }
      }
      item.scrollIntoView({ block: "nearest" });
    });
  }
  #itemIsFirstRowOfGroup(item) {
    const grid = this.itemsGrid;
    if (grid.length === 0) return false;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      if (row === void 0) continue;
      for (let c = 0; c < row.length; c++) {
        const column = row[c];
        if (column === void 0 || column.ref !== item) continue;
        return column.firstRowOfGroup;
      }
    }
    return false;
  }
  /**
   * Sets selection to item at specified index in valid items array.
   * If index is out of bounds, does nothing.
   *
   * @param index - Zero-based index of item to select
   * @remarks
   * Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
   * Access valid items directly via `getValidItems()` to check bounds before calling.
   *
   * @example
   * // get valid items length for bounds check
   * const items = getValidItems()
   * if (index < items.length) {
   *   updateSelectedToIndex(index)
   * }
   */
  updateSelectedToIndex(index) {
    const item = this.getValidItems()[index];
    if (!item) return;
    this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
  }
  /**
   * Updates selected item by moving up/down relative to current selection.
   * Handles wrapping when loop option is enabled.
   *
   * @param change - Direction to move: 1 for next item, -1 for previous item
   * @remarks
   * The loop behavior wraps:
   * - From last item to first when moving next
   * - From first item to last when moving previous
   *
   * Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
   * You can call `getValidItems()` directly to get the current valid items array.
   *
   * @example
   * // select next item
   * updateSelectedByItem(1)
   *
   * // get all valid items
   * const items = getValidItems()
   */
  updateSelectedByItem(change) {
    const selected = this.#getSelectedItem();
    const items = this.getValidItems();
    const index = items.findIndex((item) => item === selected);
    let newSelected = items[index + change];
    if (this.opts.loop.current) {
      newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
    }
    if (newSelected) {
      this.setValue(newSelected.getAttribute(COMMAND_VALUE_ATTR) ?? "");
    }
  }
  /**
   * Moves selection to the first valid item in the next/previous group.
   * If no group is found, falls back to selecting the next/previous item globally.
   *
   * @param change - Direction to move: 1 for next group, -1 for previous group
   * @example
   * // move to first item in next group
   * updateSelectedByGroup(1)
   *
   * // move to first item in previous group
   * updateSelectedByGroup(-1)
   */
  updateSelectedByGroup(change) {
    const selected = this.#getSelectedItem();
    let group = selected?.closest(COMMAND_GROUP_SELECTOR);
    let item;
    while (group && !item) {
      group = change > 0 ? findNextSibling(group, COMMAND_GROUP_SELECTOR) : findPreviousSibling(group, COMMAND_GROUP_SELECTOR);
      item = group?.querySelector(COMMAND_VALID_ITEM_SELECTOR);
    }
    if (item) {
      this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
    } else {
      this.updateSelectedByItem(change);
    }
  }
  /**
   * Maps item id to display value and search keywords.
   * Returns cleanup function to remove mapping.
   *
   * @param id - Unique item identifier
   * @param value - Display text
   * @param keywords - Optional search boost terms
   * @returns Cleanup function
   */
  registerValue(value, keywords) {
    if (!(value && value === this.allIds.get(value)?.value)) {
      this.allIds.set(value, { value, keywords });
    }
    this._commandState.filtered.items.set(value, this.#score(value, keywords));
    if (!this.sortAfterTick) {
      this.sortAfterTick = true;
      afterTick(() => {
        this.#sort();
        this.sortAfterTick = false;
      });
    }
    return () => {
      this.allIds.delete(value);
    };
  }
  /**
   * Registers item in command list and its group.
   * Handles filtering, sorting and selection updates.
   *
   * @param id - Item identifier
   * @param groupId - Optional group to add item to
   * @returns Cleanup function that handles selection
   */
  registerItem(id, groupId) {
    this.allItems.add(id);
    if (groupId) {
      if (!this.allGroups.has(groupId)) {
        this.allGroups.set(groupId, /* @__PURE__ */ new Set([id]));
      } else {
        this.allGroups.get(groupId).add(id);
      }
    }
    if (!this.sortAndFilterAfterTick) {
      this.sortAndFilterAfterTick = true;
      afterTick(() => {
        this.#filterItems();
        this.#sort();
        this.sortAndFilterAfterTick = false;
      });
    }
    this.#scheduleUpdate();
    return () => {
      const selectedItem = this.#getSelectedItem();
      this.allIds.delete(id);
      this.allItems.delete(id);
      this.commandState.filtered.items.delete(id);
      this.#filterItems();
      if (selectedItem?.getAttribute("id") === id) {
        this.#selectFirstItem();
      }
      this.#scheduleUpdate();
    };
  }
  /**
   * Creates empty group if not exists.
   *
   * @param id - Group identifier
   * @returns Cleanup function
   */
  registerGroup(id) {
    if (!this.allGroups.has(id)) {
      this.allGroups.set(id, /* @__PURE__ */ new Set());
    }
    return () => {
      this.allIds.delete(id);
      this.allGroups.delete(id);
    };
  }
  get isGrid() {
    return this.opts.columns.current !== null;
  }
  /**
   * Selects last valid item.
   */
  #last() {
    return this.updateSelectedToIndex(this.getValidItems().length - 1);
  }
  /**
   * Handles next item selection:
   * - Meta: Jump to last
   * - Alt: Next group
   * - Default: Next item
   *
   * @param e - Keyboard event
   */
  #next(e) {
    e.preventDefault();
    if (e.metaKey) {
      this.#last();
    } else if (e.altKey) {
      this.updateSelectedByGroup(1);
    } else {
      this.updateSelectedByItem(1);
    }
  }
  #down(e) {
    if (this.opts.columns.current === null) return;
    e.preventDefault();
    if (e.metaKey) {
      this.updateSelectedByGroup(1);
    } else {
      this.updateSelectedByItem(this.#nextRowColumnOffset(e));
    }
  }
  #getColumn(item, grid) {
    if (grid.length === 0) return null;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      if (row === void 0) continue;
      for (let c = 0; c < row.length; c++) {
        const column = row[c];
        if (column === void 0 || column.ref !== item) continue;
        return { columnIndex: c, rowIndex: r };
      }
    }
    return null;
  }
  #nextRowColumnOffset(e) {
    const grid = this.itemsGrid;
    const selected = this.#getSelectedItem();
    if (!selected) return 0;
    const column = this.#getColumn(selected, grid);
    if (!column) return 0;
    let newItem = null;
    const skipRows = e.altKey ? 1 : 0;
    if (e.altKey && column.rowIndex === grid.length - 2 && !this.opts.loop.current) {
      newItem = this.#findNextNonDisabledItem({
        start: grid.length - 1,
        end: grid.length,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else if (column.rowIndex === grid.length - 1) {
      if (!this.opts.loop.current) return 0;
      newItem = this.#findNextNonDisabledItem({
        start: 0 + skipRows,
        end: column.rowIndex,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else {
      newItem = this.#findNextNonDisabledItem({
        start: column.rowIndex + 1 + skipRows,
        end: grid.length,
        expectedColumnIndex: column.columnIndex,
        grid
      });
      if (newItem === null && this.opts.loop.current) {
        newItem = this.#findNextNonDisabledItem({
          start: 0,
          end: column.rowIndex,
          expectedColumnIndex: column.columnIndex,
          grid
        });
      }
    }
    return this.#calculateOffset(selected, newItem);
  }
  /** Attempts to find the next non-disabled column that matches the expected column.
   *
   * @remarks
   * - Skips over disabled columns
   * - When a row is shorter than the expected column it defaults to the last item in the row
   *
   * @param param0
   * @returns
   */
  #findNextNonDisabledItem({ start, end, grid, expectedColumnIndex }) {
    let newItem = null;
    for (let r = start; r < end; r++) {
      const row = grid[r];
      newItem = row[expectedColumnIndex]?.ref ?? null;
      if (newItem !== null && itemIsDisabled(newItem)) {
        newItem = null;
        continue;
      }
      if (newItem === null) {
        for (let i = row.length - 1; i >= 0; i--) {
          const item = row[row.length - 1];
          if (item === void 0 || itemIsDisabled(item.ref)) continue;
          newItem = item.ref;
          break;
        }
      }
      break;
    }
    return newItem;
  }
  #calculateOffset(selected, newSelected) {
    if (newSelected === null) return 0;
    const items = this.getValidItems();
    const ogIndex = items.findIndex((item) => item === selected);
    const newIndex = items.findIndex((item) => item === newSelected);
    return newIndex - ogIndex;
  }
  #up(e) {
    if (this.opts.columns.current === null) return;
    e.preventDefault();
    if (e.metaKey) {
      this.updateSelectedByGroup(-1);
    } else {
      this.updateSelectedByItem(this.#previousRowColumnOffset(e));
    }
  }
  #previousRowColumnOffset(e) {
    const grid = this.itemsGrid;
    const selected = this.#getSelectedItem();
    if (selected === void 0) return 0;
    const column = this.#getColumn(selected, grid);
    if (column === null) return 0;
    let newItem = null;
    const skipRows = e.altKey ? 1 : 0;
    if (e.altKey && column.rowIndex === 1 && this.opts.loop.current === false) {
      newItem = this.#findNextNonDisabledItemDesc({
        start: 0,
        end: 0,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else if (column.rowIndex === 0) {
      if (this.opts.loop.current === false) return 0;
      newItem = this.#findNextNonDisabledItemDesc({
        start: grid.length - 1 - skipRows,
        end: column.rowIndex + 1,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else {
      newItem = this.#findNextNonDisabledItemDesc({
        start: column.rowIndex - 1 - skipRows,
        end: 0,
        expectedColumnIndex: column.columnIndex,
        grid
      });
      if (newItem === null && this.opts.loop.current) {
        newItem = this.#findNextNonDisabledItemDesc({
          start: grid.length - 1,
          end: column.rowIndex + 1,
          expectedColumnIndex: column.columnIndex,
          grid
        });
      }
    }
    return this.#calculateOffset(selected, newItem);
  }
  /**
   * Attempts to find the next non-disabled column that matches the expected column.
   *
   * @remarks
   * - Skips over disabled columns
   * - When a row is shorter than the expected column it defaults to the last item in the row
   */
  #findNextNonDisabledItemDesc({ start, end, grid, expectedColumnIndex }) {
    let newItem = null;
    for (let r = start; r >= end; r--) {
      const row = grid[r];
      if (row === void 0) continue;
      newItem = row[expectedColumnIndex]?.ref ?? null;
      if (newItem !== null && itemIsDisabled(newItem)) {
        newItem = null;
        continue;
      }
      if (newItem === null) {
        for (let i = row.length - 1; i >= 0; i--) {
          const item = row[row.length - 1];
          if (item === void 0 || itemIsDisabled(item.ref)) continue;
          newItem = item.ref;
          break;
        }
      }
      break;
    }
    return newItem;
  }
  /**
   * Handles previous item selection:
   * - Meta: Jump to first
   * - Alt: Previous group
   * - Default: Previous item
   *
   * @param e - Keyboard event
   */
  #prev(e) {
    e.preventDefault();
    if (e.metaKey) {
      this.updateSelectedToIndex(0);
    } else if (e.altKey) {
      this.updateSelectedByGroup(-1);
    } else {
      this.updateSelectedByItem(-1);
    }
  }
  onkeydown(e) {
    const isVim = this.opts.vimBindings.current && e.ctrlKey;
    switch (e.key) {
      case n:
      case j: {
        if (isVim) {
          if (this.isGrid) {
            this.#down(e);
          } else {
            this.#next(e);
          }
        }
        break;
      }
      case l: {
        if (isVim) {
          if (this.isGrid) {
            this.#next(e);
          }
        }
        break;
      }
      case ARROW_DOWN:
        if (this.isGrid) {
          this.#down(e);
        } else {
          this.#next(e);
        }
        break;
      case ARROW_RIGHT:
        if (!this.isGrid) break;
        this.#next(e);
        break;
      case p:
      case k: {
        if (isVim) {
          if (this.isGrid) {
            this.#up(e);
          } else {
            this.#prev(e);
          }
        }
        break;
      }
      case h: {
        if (isVim && this.isGrid) {
          this.#prev(e);
        }
        break;
      }
      case ARROW_UP:
        if (this.isGrid) {
          this.#up(e);
        } else {
          this.#prev(e);
        }
        break;
      case ARROW_LEFT:
        if (!this.isGrid) break;
        this.#prev(e);
        break;
      case HOME:
        e.preventDefault();
        this.updateSelectedToIndex(0);
        break;
      case END:
        e.preventDefault();
        this.#last();
        break;
      case ENTER: {
        if (!e.isComposing && e.keyCode !== 229) {
          e.preventDefault();
          const item = this.#getSelectedItem();
          if (item) {
            item?.click();
          }
        }
      }
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "application",
    [commandAttrs.root]: "",
    tabindex: -1,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function itemIsDisabled(item) {
  return item.getAttribute("aria-disabled") === "true";
}
class CommandEmptyState {
  static create(opts) {
    return new CommandEmptyState(opts, CommandRootContext.get());
  }
  opts;
  root;
  attachment;
  #shouldRender = derived(() => {
    return this.root._commandState.filtered.count === 0 && this.#isInitialRender === false || this.opts.forceMount.current;
  });
  get shouldRender() {
    return this.#shouldRender();
  }
  set shouldRender($$value) {
    return this.#shouldRender($$value);
  }
  #isInitialRender = true;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "presentation",
    [commandAttrs.empty]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CommandInputState {
  static create(opts) {
    return new CommandInputState(opts, CommandRootContext.get());
  }
  opts;
  root;
  attachment;
  #selectedItemId = derived(() => {
    const item = this.root.viewportNode?.querySelector(`${COMMAND_ITEM_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(this.root.opts.value.current)}"]`);
    if (item === void 0 || item === null) return;
    return item.getAttribute("id") ?? void 0;
  });
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.inputNode = v);
    watch(() => this.opts.ref.current, () => {
      const node = this.opts.ref.current;
      if (node && this.opts.autofocus.current) {
        afterSleep(10, () => node.focus());
      }
    });
    watch(() => this.opts.value.current, () => {
      if (this.root.commandState.search !== this.opts.value.current) {
        this.root.setState("search", this.opts.value.current);
      }
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    type: "text",
    [commandAttrs.input]: "",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: false,
    "aria-autocomplete": "list",
    role: "combobox",
    "aria-expanded": getAriaExpanded(true),
    "aria-controls": this.root.viewportNode?.id ?? void 0,
    "aria-labelledby": this.root.labelNode?.id ?? void 0,
    "aria-activedescendant": this.#selectedItemId(),
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CommandItemState {
  static create(opts) {
    const group = CommandGroupContainerContext.getOr(null);
    return new CommandItemState({ ...opts, group }, CommandRootContext.get());
  }
  opts;
  root;
  attachment;
  #group = null;
  #trueForceMount = derived(() => {
    return this.opts.forceMount.current || this.#group?.opts.forceMount.current === true;
  });
  #shouldRender = derived(() => {
    this.opts.ref.current;
    if (this.#trueForceMount() || this.root.opts.shouldFilter.current === false || !this.root.commandState.search) {
      return true;
    }
    const currentScore = this.root.commandState.filtered.items.get(this.trueValue);
    if (currentScore === void 0) return false;
    return currentScore > 0;
  });
  get shouldRender() {
    return this.#shouldRender();
  }
  set shouldRender($$value) {
    return this.#shouldRender($$value);
  }
  #isSelected = derived(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
  get isSelected() {
    return this.#isSelected();
  }
  set isSelected($$value) {
    return this.#isSelected($$value);
  }
  trueValue = "";
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.#group = CommandGroupContainerContext.getOr(null);
    this.trueValue = opts.value.current;
    this.attachment = attachRef(this.opts.ref);
    watch(
      [
        () => this.trueValue,
        () => this.#group?.trueValue,
        () => this.opts.forceMount.current
      ],
      () => {
        if (this.opts.forceMount.current) return;
        return this.root.registerItem(this.trueValue, this.#group?.trueValue);
      }
    );
    watch(
      [
        () => this.opts.value.current,
        () => this.opts.ref.current
      ],
      () => {
        if (!this.opts.value.current && this.opts.ref.current?.textContent) {
          this.trueValue = this.opts.ref.current.textContent.trim();
        }
        this.root.registerValue(this.trueValue, opts.keywords.current.map((kw) => kw.trim()));
        this.opts.ref.current?.setAttribute(COMMAND_VALUE_ATTR, this.trueValue);
      }
    );
    this.onclick = this.onclick.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
  }
  #onSelect() {
    if (this.opts.disabled.current) return;
    this.#select();
    this.opts.onSelect?.current();
  }
  #select() {
    if (this.opts.disabled.current) return;
    this.root.setValue(this.trueValue, true);
  }
  onpointermove(_) {
    if (this.opts.disabled.current || this.root.opts.disablePointerSelection.current) return;
    this.#select();
  }
  onclick(_) {
    if (this.opts.disabled.current) return;
    this.#onSelect();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-disabled": getAriaDisabled(this.opts.disabled.current),
    "aria-selected": getAriaSelected(this.isSelected),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    "data-selected": getDataSelected(this.isSelected),
    "data-value": this.trueValue,
    "data-group": this.#group?.trueValue,
    [commandAttrs.item]: "",
    role: "option",
    onpointermove: this.onpointermove,
    onclick: this.onclick,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CommandListState {
  static create(opts) {
    return CommandListContext.set(new CommandListState(opts, CommandRootContext.get()));
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "listbox",
    "aria-label": this.opts.ariaLabel.current,
    [commandAttrs.list]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CommandLabelState {
  static create(opts) {
    return new CommandLabelState(opts, CommandRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.labelNode = v);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [commandAttrs["input-label"]]: "",
    for: this.opts.for?.current,
    style: srOnlyStyles,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function _command_label($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const labelState = CommandLabelState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, labelState.props);
  $$payload.out += `<label${spread_attributes({ ...mergedProps }, null)}>`;
  children?.($$payload);
  $$payload.out += `<!----></label>`;
  bind_props($$props, { ref });
  pop();
}
function Command$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    value = "",
    onValueChange = noop,
    onStateChange = noop,
    loop = false,
    shouldFilter = true,
    filter = computeCommandScore,
    label = "",
    vimBindings = true,
    disablePointerSelection = false,
    disableInitialScroll = false,
    columns = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = CommandRootState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    filter: box.with(() => filter),
    shouldFilter: box.with(() => shouldFilter),
    loop: box.with(() => loop),
    value: box.with(() => value, (v) => {
      if (value !== v) {
        value = v;
        onValueChange(v);
      }
    }),
    vimBindings: box.with(() => vimBindings),
    disablePointerSelection: box.with(() => disablePointerSelection),
    disableInitialScroll: box.with(() => disableInitialScroll),
    onStateChange: box.with(() => onStateChange),
    columns: box.with(() => columns)
  });
  const updateSelectedToIndex = (i) => rootState.updateSelectedToIndex(i);
  const updateSelectedByGroup = (c) => rootState.updateSelectedByGroup(c);
  const updateSelectedByItem = (c) => rootState.updateSelectedByItem(c);
  const getValidItems = () => rootState.getValidItems();
  const mergedProps = mergeProps(restProps, rootState.props);
  function Label2($$payload2) {
    _command_label($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->${escape_html(label)}`;
      },
      $$slots: { default: true }
    });
  }
  if (child) {
    $$payload.out += "<!--[-->";
    Label2($$payload);
    $$payload.out += `<!----> `;
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    Label2($$payload);
    $$payload.out += `<!----> `;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    ref,
    value,
    updateSelectedToIndex,
    updateSelectedByGroup,
    updateSelectedByItem,
    getValidItems
  });
  pop();
}
function Command_empty$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emptyState = CommandEmptyState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    forceMount: box.with(() => forceMount)
  });
  const mergedProps = mergeProps(emptyState.props, restProps);
  if (emptyState.shouldRender) {
    $$payload.out += "<!--[-->";
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: mergedProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Command_input$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    value = "",
    autofocus = false,
    id = createId(uid),
    ref = null,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const inputState = CommandInputState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value, (v) => {
      value = v;
    }),
    autofocus: box.with(() => autofocus ?? false)
  });
  const mergedProps = mergeProps(restProps, inputState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes({ ...mergedProps, value }, null)}/>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { value, ref });
  pop();
}
function Command_item$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    value = "",
    disabled = false,
    children,
    child,
    onSelect = noop,
    forceMount = false,
    keywords = [],
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = CommandItemState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    onSelect: box.with(() => onSelect),
    forceMount: box.with(() => forceMount),
    keywords: box.with(() => keywords)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  $$payload.out += `<!---->`;
  {
    $$payload.out += `<div style="display: contents;" data-item-wrapper=""${attr("data-value", itemState.trueValue)}>`;
    if (itemState.shouldRender) {
      $$payload.out += "<!--[-->";
      if (child) {
        $$payload.out += "<!--[-->";
        child($$payload, { props: mergedProps });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
        children?.($$payload);
        $$payload.out += `<!----></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Command_list$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    child,
    children,
    "aria-label": ariaLabel,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const listState = CommandListState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    ariaLabel: box.with(() => ariaLabel ?? "Suggestions...")
  });
  const mergedProps = mergeProps(restProps, listState.props);
  $$payload.out += `<!---->`;
  {
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: mergedProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
const SCORE_CONTINUE_MATCH = 1;
const SCORE_SPACE_WORD_JUMP = 0.9;
const SCORE_NON_SPACE_WORD_JUMP = 0.8;
const SCORE_CHARACTER_JUMP = 0.17;
const SCORE_TRANSPOSITION = 0.1;
const PENALTY_SKIPPED = 0.999;
const PENALTY_CASE_MISMATCH = 0.9999;
const PENALTY_NOT_COMPLETE = 0.99;
const IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
const COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
const IS_SPACE_REGEXP = /[\s-]/;
const COUNT_SPACE_REGEXP = /[\s-]/g;
function computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
  if (abbreviationIndex === abbreviation.length) {
    if (stringIndex === string.length)
      return SCORE_CONTINUE_MATCH;
    return PENALTY_NOT_COMPLETE;
  }
  const memoizeKey = `${stringIndex},${abbreviationIndex}`;
  if (memoizedResults[memoizeKey] !== void 0)
    return memoizedResults[memoizeKey];
  const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
  let index = lowerString.indexOf(abbreviationChar, stringIndex);
  let highScore = 0;
  let score, transposedScore, wordBreaks, spaceBreaks;
  while (index >= 0) {
    score = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
    if (score > highScore) {
      if (index === stringIndex) {
        score *= SCORE_CONTINUE_MATCH;
      } else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_NON_SPACE_WORD_JUMP;
        wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
        if (wordBreaks && stringIndex > 0) {
          score *= PENALTY_SKIPPED ** wordBreaks.length;
        }
      } else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_SPACE_WORD_JUMP;
        spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
        if (spaceBreaks && stringIndex > 0) {
          score *= PENALTY_SKIPPED ** spaceBreaks.length;
        }
      } else {
        score *= SCORE_CHARACTER_JUMP;
        if (stringIndex > 0) {
          score *= PENALTY_SKIPPED ** (index - stringIndex);
        }
      }
      if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) {
        score *= PENALTY_CASE_MISMATCH;
      }
    }
    if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
      transposedScore = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
      if (transposedScore * SCORE_TRANSPOSITION > score) {
        score = transposedScore * SCORE_TRANSPOSITION;
      }
    }
    if (score > highScore) {
      highScore = score;
    }
    index = lowerString.indexOf(abbreviationChar, index + 1);
  }
  memoizedResults[memoizeKey] = highScore;
  return highScore;
}
function formatInput(string) {
  return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
function computeCommandScore(command, search, commandKeywords) {
  command = commandKeywords && commandKeywords.length > 0 ? `${`${command} ${commandKeywords?.join(" ")}`}` : command;
  return computeCommandScoreInner(command, search, formatInput(command), formatInput(search), 0, 0, {});
}
class GraceArea {
  #opts;
  #enabled;
  #isPointerInTransit;
  #pointerGraceArea = null;
  constructor(opts) {
    this.#opts = opts;
    this.#enabled = derived(() => this.#opts.enabled());
    this.#isPointerInTransit = boxAutoReset(false, {
      afterMs: opts.transitTimeout ?? 300,
      onChange: (value) => {
        if (!this.#enabled()) return;
        this.#opts.setIsPointerInTransit?.(value);
      },
      getWindow: () => getWindow(this.#opts.triggerNode())
    });
    watch(
      [
        opts.triggerNode,
        opts.contentNode,
        opts.enabled
      ],
      ([triggerNode, contentNode, enabled]) => {
        if (!triggerNode || !contentNode || !enabled) return;
        const handleTriggerLeave = (e) => {
          this.#createGraceArea(e, contentNode);
        };
        const handleContentLeave = (e) => {
          this.#createGraceArea(e, triggerNode);
        };
        return executeCallbacks(on(triggerNode, "pointerleave", handleTriggerLeave), on(contentNode, "pointerleave", handleContentLeave));
      }
    );
    watch(() => this.#pointerGraceArea, () => {
      const handleTrackPointerGrace = (e) => {
        if (!this.#pointerGraceArea) return;
        const target = e.target;
        if (!isElement(target)) return;
        const pointerPosition = { x: e.clientX, y: e.clientY };
        const hasEnteredTarget = opts.triggerNode()?.contains(target) || opts.contentNode()?.contains(target);
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, this.#pointerGraceArea);
        if (hasEnteredTarget) {
          this.#removeGraceArea();
        } else if (isPointerOutsideGraceArea) {
          this.#removeGraceArea();
          opts.onPointerExit();
        }
      };
      const doc = getDocument(opts.triggerNode() ?? opts.contentNode());
      if (!doc) return;
      return on(doc, "pointermove", handleTrackPointerGrace);
    });
  }
  #removeGraceArea() {
    this.#pointerGraceArea = null;
    this.#isPointerInTransit.current = false;
  }
  #createGraceArea(e, hoverTarget) {
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget)) return;
    const exitPoint = { x: e.clientX, y: e.clientY };
    const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
    const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
    const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
    const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
    this.#pointerGraceArea = graceArea;
    this.#isPointerInTransit.current = true;
  }
}
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const tipPadding = padding * 1.5;
  switch (exitSide) {
    case "top":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        },
        { x: exitPoint.x, y: exitPoint.y - tipPadding },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        }
      ];
    case "bottom":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x, y: exitPoint.y + tipPadding },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        }
      ];
    case "left":
      return [
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x - tipPadding, y: exitPoint.y },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        }
      ];
    case "right":
      return [
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        },
        { x: exitPoint.x + tipPadding, y: exitPoint.y },
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        }
      ];
  }
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j2 = polygon.length - 1; i < polygon.length; j2 = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j2].x;
    const yj = polygon[j2].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p2 = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p2);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p2 = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p2);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
  else return upperHull.concat(lowerHull);
}
class SvelteResizeObserver {
  #node;
  #onResize;
  constructor(node, onResize) {
    this.#node = node;
    this.#onResize = onResize;
    this.handler = this.handler.bind(this);
  }
  handler() {
    let rAF = 0;
    const _node = this.#node();
    if (!_node) return;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = window.requestAnimationFrame(this.#onResize);
    });
    resizeObserver.observe(_node);
    return () => {
      window.cancelAnimationFrame(rAF);
      resizeObserver.unobserve(_node);
    };
  }
}
function clamp(n2, min, max) {
  return Math.min(max, Math.max(min, n2));
}
const scrollAreaAttrs = createBitsAttrs({
  component: "scroll-area",
  parts: [
    "root",
    "viewport",
    "corner",
    "thumb",
    "scrollbar"
  ]
});
const ScrollAreaRootContext = new Context$1("ScrollArea.Root");
const ScrollAreaScrollbarContext = new Context$1("ScrollArea.Scrollbar");
const ScrollAreaScrollbarVisibleContext = new Context$1("ScrollArea.ScrollbarVisible");
const ScrollAreaScrollbarAxisContext = new Context$1("ScrollArea.ScrollbarAxis");
const ScrollAreaScrollbarSharedContext = new Context$1("ScrollArea.ScrollbarShared");
class ScrollAreaRootState {
  static create(opts) {
    return ScrollAreaRootContext.set(new ScrollAreaRootState(opts));
  }
  opts;
  attachment;
  scrollAreaNode = null;
  viewportNode = null;
  contentNode = null;
  scrollbarXNode = null;
  scrollbarYNode = null;
  cornerWidth = 0;
  cornerHeight = 0;
  scrollbarXEnabled = false;
  scrollbarYEnabled = false;
  domContext;
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref, (v) => this.scrollAreaNode = v);
    this.domContext = new DOMContext(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    dir: this.opts.dir.current,
    style: {
      position: "relative",
      "--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
      "--bits-scroll-area-corner-width": `${this.cornerWidth}px`
    },
    [scrollAreaAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaViewportState {
  static create(opts) {
    return new ScrollAreaViewportState(opts, ScrollAreaRootContext.get());
  }
  opts;
  root;
  attachment;
  #contentId = box(useId());
  #contentRef = box(null);
  contentAttachment = attachRef(this.#contentRef, (v) => this.root.contentNode = v);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref, (v) => this.root.viewportNode = v);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
    },
    [scrollAreaAttrs.viewport]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #contentProps = derived(() => ({
    id: this.#contentId.current,
    "data-scroll-area-content": "",
    /**
     * When horizontal scrollbar is visible: this element should be at least
     * as wide as its children for size calculations to work correctly.
     *
     * When horizontal scrollbar is NOT visible: this element's width should
     * be constrained by the parent container to enable `text-overflow: ellipsis`
     */
    style: {
      minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0
    },
    ...this.contentAttachment
  }));
  get contentProps() {
    return this.#contentProps();
  }
  set contentProps($$value) {
    return this.#contentProps($$value);
  }
}
class ScrollAreaScrollbarState {
  static create(opts) {
    return ScrollAreaScrollbarContext.set(new ScrollAreaScrollbarState(opts, ScrollAreaRootContext.get()));
  }
  opts;
  root;
  #isHorizontal = derived(() => this.opts.orientation.current === "horizontal");
  get isHorizontal() {
    return this.#isHorizontal();
  }
  set isHorizontal($$value) {
    return this.#isHorizontal($$value);
  }
  hasThumb = false;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    watch(() => this.isHorizontal, (isHorizontal) => {
      if (isHorizontal) {
        this.root.scrollbarXEnabled = true;
        return () => {
          this.root.scrollbarXEnabled = false;
        };
      } else {
        this.root.scrollbarYEnabled = true;
        return () => {
          this.root.scrollbarYEnabled = false;
        };
      }
    });
  }
}
class ScrollAreaScrollbarHoverState {
  static create() {
    return new ScrollAreaScrollbarHoverState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  #props = derived(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarScrollState {
  static create() {
    return new ScrollAreaScrollbarScrollState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  machine = new StateMachine("hidden", {
    hidden: { SCROLL: "scrolling" },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  #isHidden = derived(() => this.machine.state.current === "hidden");
  get isHidden() {
    return this.#isHidden();
  }
  set isHidden($$value) {
    return this.#isHidden($$value);
  }
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    useDebounce(() => this.machine.dispatch("SCROLL_END"), 100);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  onpointerenter(_) {
    this.machine.dispatch("POINTER_ENTER");
  }
  onpointerleave(_) {
    this.machine.dispatch("POINTER_LEAVE");
  }
  #props = derived(() => ({
    "data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarAutoState {
  static create() {
    return new ScrollAreaScrollbarAutoState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    const handleResize = useDebounce(
      () => {
        const viewportNode = this.root.viewportNode;
        if (!viewportNode) return;
        const isOverflowX = viewportNode.offsetWidth < viewportNode.scrollWidth;
        const isOverflowY = viewportNode.offsetHeight < viewportNode.scrollHeight;
        this.isVisible = this.scrollbar.isHorizontal ? isOverflowX : isOverflowY;
      },
      10
    );
    new SvelteResizeObserver(() => this.root.viewportNode, handleResize);
    new SvelteResizeObserver(() => this.root.contentNode, handleResize);
  }
  #props = derived(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarVisibleState {
  static create() {
    return ScrollAreaScrollbarVisibleContext.set(new ScrollAreaScrollbarVisibleState(ScrollAreaScrollbarContext.get()));
  }
  scrollbar;
  root;
  thumbNode = null;
  pointerOffset = 0;
  sizes = {
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  };
  #thumbRatio = derived(() => getThumbRatio(this.sizes.viewport, this.sizes.content));
  get thumbRatio() {
    return this.#thumbRatio();
  }
  set thumbRatio($$value) {
    return this.#thumbRatio($$value);
  }
  #hasThumb = derived(() => Boolean(this.thumbRatio > 0 && this.thumbRatio < 1));
  get hasThumb() {
    return this.#hasThumb();
  }
  set hasThumb($$value) {
    return this.#hasThumb($$value);
  }
  // this needs to be a $state to properly restore the transform style when the scrollbar
  // goes from a hidden to visible state, otherwise it will start at the beginning of the
  // scrollbar and flicker to the correct position after
  prevTransformStyle = "";
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  setSizes(sizes) {
    this.sizes = sizes;
  }
  getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer({
      pointerPos,
      pointerOffset: this.pointerOffset,
      sizes: this.sizes,
      dir
    });
  }
  onThumbPointerUp() {
    this.pointerOffset = 0;
  }
  onThumbPointerDown(pointerPos) {
    this.pointerOffset = pointerPos;
  }
  xOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollLeft;
    const offset = getThumbOffsetFromScroll({
      scrollPos,
      sizes: this.sizes,
      dir: this.root.opts.dir.current
    });
    const transformStyle = `translate3d(${offset}px, 0, 0)`;
    this.thumbNode.style.transform = transformStyle;
    this.prevTransformStyle = transformStyle;
  }
  xOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = scrollPos;
  }
  xOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
  }
  yOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollTop;
    const offset = getThumbOffsetFromScroll({ scrollPos, sizes: this.sizes });
    const transformStyle = `translate3d(0, ${offset}px, 0)`;
    this.thumbNode.style.transform = transformStyle;
    this.prevTransformStyle = transformStyle;
  }
  yOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = scrollPos;
  }
  yOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
  }
}
class ScrollAreaScrollbarXState {
  static create(opts) {
    return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarXState(opts, ScrollAreaScrollbarVisibleContext.get()));
  }
  opts;
  scrollbarVis;
  root;
  scrollbar;
  attachment;
  computedStyle;
  constructor(opts, scrollbarVis) {
    this.opts = opts;
    this.scrollbarVis = scrollbarVis;
    this.root = scrollbarVis.root;
    this.scrollbar = scrollbarVis.scrollbar;
    this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarXNode = v);
  }
  onThumbPointerDown = (pointerPos) => {
    this.scrollbarVis.onThumbPointerDown(pointerPos.x);
  };
  onDragScroll = (pointerPos) => {
    this.scrollbarVis.xOnDragScroll(pointerPos.x);
  };
  onThumbPointerUp = () => {
    this.scrollbarVis.onThumbPointerUp();
  };
  onThumbPositionChange = () => {
    this.scrollbarVis.xOnThumbPositionChange();
  };
  onWheelScroll = (e, maxScrollPos) => {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollLeft + e.deltaX;
    this.scrollbarVis.xOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  };
  onResize = () => {
    if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollWidth,
      viewport: this.root.viewportNode.offsetWidth,
      scrollbar: {
        size: this.scrollbar.opts.ref.current.clientWidth,
        paddingStart: toInt(this.computedStyle.paddingLeft),
        paddingEnd: toInt(this.computedStyle.paddingRight)
      }
    });
  };
  #thumbSize = derived(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  set thumbSize($$value) {
    return this.#thumbSize($$value);
  }
  #props = derived(() => ({
    id: this.scrollbar.opts.id.current,
    "data-orientation": "horizontal",
    style: {
      bottom: 0,
      left: this.root.opts.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
      right: this.root.opts.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
      "--bits-scroll-area-thumb-width": `${this.thumbSize}px`
    },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarYState {
  static create(opts) {
    return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarYState(opts, ScrollAreaScrollbarVisibleContext.get()));
  }
  opts;
  scrollbarVis;
  root;
  scrollbar;
  attachment;
  computedStyle;
  constructor(opts, scrollbarVis) {
    this.opts = opts;
    this.scrollbarVis = scrollbarVis;
    this.root = scrollbarVis.root;
    this.scrollbar = scrollbarVis.scrollbar;
    this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarYNode = v);
    this.onThumbPointerDown = this.onThumbPointerDown.bind(this);
    this.onDragScroll = this.onDragScroll.bind(this);
    this.onThumbPointerUp = this.onThumbPointerUp.bind(this);
    this.onThumbPositionChange = this.onThumbPositionChange.bind(this);
    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  onThumbPointerDown(pointerPos) {
    this.scrollbarVis.onThumbPointerDown(pointerPos.y);
  }
  onDragScroll(pointerPos) {
    this.scrollbarVis.yOnDragScroll(pointerPos.y);
  }
  onThumbPointerUp() {
    this.scrollbarVis.onThumbPointerUp();
  }
  onThumbPositionChange() {
    this.scrollbarVis.yOnThumbPositionChange();
  }
  onWheelScroll(e, maxScrollPos) {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollTop + e.deltaY;
    this.scrollbarVis.yOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  }
  onResize() {
    if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollHeight,
      viewport: this.root.viewportNode.offsetHeight,
      scrollbar: {
        size: this.scrollbar.opts.ref.current.clientHeight,
        paddingStart: toInt(this.computedStyle.paddingTop),
        paddingEnd: toInt(this.computedStyle.paddingBottom)
      }
    });
  }
  #thumbSize = derived(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  set thumbSize($$value) {
    return this.#thumbSize($$value);
  }
  #props = derived(() => ({
    id: this.scrollbar.opts.id.current,
    "data-orientation": "vertical",
    style: {
      top: 0,
      right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
      left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
      bottom: "var(--bits-scroll-area-corner-height)",
      "--bits-scroll-area-thumb-height": `${this.thumbSize}px`
    },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarSharedState {
  static create() {
    return ScrollAreaScrollbarSharedContext.set(new ScrollAreaScrollbarSharedState(ScrollAreaScrollbarAxisContext.get()));
  }
  scrollbarState;
  root;
  scrollbarVis;
  scrollbar;
  rect = null;
  prevWebkitUserSelect = "";
  handleResize;
  handleThumbPositionChange;
  handleWheelScroll;
  handleThumbPointerDown;
  handleThumbPointerUp;
  #maxScrollPos = derived(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
  get maxScrollPos() {
    return this.#maxScrollPos();
  }
  set maxScrollPos($$value) {
    return this.#maxScrollPos($$value);
  }
  constructor(scrollbarState) {
    this.scrollbarState = scrollbarState;
    this.root = scrollbarState.root;
    this.scrollbarVis = scrollbarState.scrollbarVis;
    this.scrollbar = scrollbarState.scrollbarVis.scrollbar;
    this.handleResize = useDebounce(() => this.scrollbarState.onResize(), 10);
    this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange;
    this.handleWheelScroll = this.scrollbarState.onWheelScroll;
    this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown;
    this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp;
    new SvelteResizeObserver(() => this.scrollbar.opts.ref.current, this.handleResize);
    new SvelteResizeObserver(() => this.root.contentNode, this.handleResize);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  handleDragScroll(e) {
    if (!this.rect) return;
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    this.scrollbarState.onDragScroll({ x, y });
  }
  onpointerdown(e) {
    if (e.button !== 0) return;
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    this.rect = this.scrollbar.opts.ref.current?.getBoundingClientRect() ?? null;
    this.prevWebkitUserSelect = this.root.domContext.getDocument().body.style.webkitUserSelect;
    this.root.domContext.getDocument().body.style.webkitUserSelect = "none";
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "auto";
    this.handleDragScroll(e);
  }
  onpointermove(e) {
    this.handleDragScroll(e);
  }
  onpointerup(e) {
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    this.root.domContext.getDocument().body.style.webkitUserSelect = this.prevWebkitUserSelect;
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "";
    this.rect = null;
  }
  #props = derived(() => mergeProps({
    ...this.scrollbarState.props,
    style: {
      position: "absolute",
      ...this.scrollbarState.props.style
    },
    [scrollAreaAttrs.scrollbar]: "",
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaThumbImplState {
  static create(opts) {
    return new ScrollAreaThumbImplState(opts, ScrollAreaScrollbarSharedContext.get());
  }
  opts;
  scrollbarState;
  attachment;
  #root;
  #removeUnlinkedScrollListener;
  #debounceScrollEnd = useDebounce(
    () => {
      if (this.#removeUnlinkedScrollListener) {
        this.#removeUnlinkedScrollListener();
        this.#removeUnlinkedScrollListener = void 0;
      }
    },
    100
  );
  constructor(opts, scrollbarState) {
    this.opts = opts;
    this.scrollbarState = scrollbarState;
    this.#root = scrollbarState.root;
    this.attachment = attachRef(this.opts.ref, (v) => this.scrollbarState.scrollbarVis.thumbNode = v);
    this.onpointerdowncapture = this.onpointerdowncapture.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  onpointerdowncapture(e) {
    const thumb = e.target;
    if (!thumb) return;
    const thumbRect = thumb.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    this.scrollbarState.handleThumbPointerDown({ x, y });
  }
  onpointerup(_) {
    this.scrollbarState.handleThumbPointerUp();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": this.scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
    style: {
      width: "var(--bits-scroll-area-thumb-width)",
      height: "var(--bits-scroll-area-thumb-height)",
      transform: this.scrollbarState.scrollbarVis.prevTransformStyle
    },
    onpointerdowncapture: this.onpointerdowncapture,
    onpointerup: this.onpointerup,
    [scrollAreaAttrs.thumb]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaCornerImplState {
  static create(opts) {
    return new ScrollAreaCornerImplState(opts, ScrollAreaRootContext.get());
  }
  opts;
  root;
  attachment;
  #width = 0;
  #height = 0;
  #hasSize = derived(() => Boolean(this.#width && this.#height));
  get hasSize() {
    return this.#hasSize();
  }
  set hasSize($$value) {
    return this.#hasSize($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
    new SvelteResizeObserver(() => this.root.scrollbarXNode, () => {
      const height = this.root.scrollbarXNode?.offsetHeight || 0;
      this.root.cornerHeight = height;
      this.#height = height;
    });
    new SvelteResizeObserver(() => this.root.scrollbarYNode, () => {
      const width = this.root.scrollbarYNode?.offsetWidth || 0;
      this.root.cornerWidth = width;
      this.#width = width;
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      width: this.#width,
      height: this.#height,
      position: "absolute",
      right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
      left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
      bottom: 0
    },
    [scrollAreaAttrs.corner]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function toInt(value) {
  return value ? Number.parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer({
  pointerPos,
  pointerOffset,
  sizes,
  dir = "ltr"
}) {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll({ scrollPos, sizes, dir = "ltr" }) {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange[0], scrollClampRange[1]);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function Scroll_area$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = createId(uid),
    type = "hover",
    dir = "ltr",
    scrollHideDelay = 600,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = ScrollAreaRootState.create({
    type: box.with(() => type),
    dir: box.with(() => dir),
    scrollHideDelay: box.with(() => scrollHideDelay),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_viewport($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = createId(uid),
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const viewportState = ScrollAreaViewportState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, viewportState.props);
  const mergedContentProps = mergeProps({}, viewportState.contentProps);
  $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}><div${spread_attributes({ ...mergedContentProps }, null)}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_scrollbar_shared($$payload, $$props) {
  push();
  let {
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarSharedState = ScrollAreaScrollbarSharedState.create();
  const mergedProps = mergeProps(restProps, scrollbarSharedState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Scroll_area_scrollbar_x($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarXState = ScrollAreaScrollbarXState.create({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarXState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_y($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarYState = ScrollAreaScrollbarYState.create({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarYState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_visible($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const scrollbarVisibleState = ScrollAreaScrollbarVisibleState.create();
  if (scrollbarVisibleState.scrollbar.opts.orientation.current === "horizontal") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_x($$payload, spread_props([restProps]));
  } else {
    $$payload.out += "<!--[!-->";
    Scroll_area_scrollbar_y($$payload, spread_props([restProps]));
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Scroll_area_scrollbar_auto($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
  const mergedProps = mergeProps(restProps, scrollbarAutoState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, {
      open: forceMount || scrollbarAutoState.isVisible,
      ref: scrollbarAutoState.scrollbar.opts.ref,
      presence
    });
  }
  pop();
}
function Scroll_area_scrollbar_scroll($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarScrollState = ScrollAreaScrollbarScrollState.create();
  const mergedProps = mergeProps(restProps, scrollbarScrollState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        open: forceMount || !scrollbarScrollState.isHidden,
        ref: scrollbarScrollState.scrollbar.opts.ref,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar_hover($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarHoverState = ScrollAreaScrollbarHoverState.create();
  const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
  const mergedProps = mergeProps(restProps, scrollbarHoverState.props, scrollbarAutoState.props, {
    "data-state": scrollbarHoverState.isVisible ? "visible" : "hidden"
  });
  const open = forceMount || scrollbarHoverState.isVisible && scrollbarAutoState.isVisible;
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, {
      open,
      ref: scrollbarAutoState.scrollbar.opts.ref,
      presence
    });
  }
  pop();
}
function Scroll_area_scrollbar$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = createId(uid),
    orientation,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = ScrollAreaScrollbarState.create({
    orientation: box.with(() => orientation),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const type = scrollbarState.root.opts.type.current;
  if (type === "hover") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_hover($$payload, spread_props([restProps, { id }]));
  } else if (type === "scroll") {
    $$payload.out += "<!--[1-->";
    Scroll_area_scrollbar_scroll($$payload, spread_props([restProps, { id }]));
  } else if (type === "auto") {
    $$payload.out += "<!--[2-->";
    Scroll_area_scrollbar_auto($$payload, spread_props([restProps, { id }]));
  } else if (type === "always") {
    $$payload.out += "<!--[3-->";
    Scroll_area_scrollbar_visible($$payload, spread_props([restProps, { id }]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_thumb_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    child,
    children,
    present,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const isMounted = new IsMounted();
  const thumbState = ScrollAreaThumbImplState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    mounted: box.with(() => isMounted.current)
  });
  const mergedProps = mergeProps(restProps, thumbState.props, { style: { hidden: !present } });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_thumb($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = ScrollAreaScrollbarVisibleContext.get();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let presence = function($$payload3, { present }) {
        Scroll_area_thumb_impl($$payload3, spread_props([
          restProps,
          {
            id,
            present,
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
      };
      Presence_layer($$payload2, {
        open: forceMount || scrollbarState.hasThumb,
        ref: scrollbarState.scrollbar.opts.ref,
        presence
      });
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_corner_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cornerState = ScrollAreaCornerImplState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, cornerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_corner($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollAreaState = ScrollAreaRootContext.get();
  const hasBothScrollbarsVisible = Boolean(scrollAreaState.scrollbarXNode && scrollAreaState.scrollbarYNode);
  const hasCorner = scrollAreaState.opts.type.current !== "scroll" && hasBothScrollbarsVisible;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (hasCorner) {
      $$payload2.out += "<!--[-->";
      Scroll_area_corner_impl($$payload2, spread_props([
        restProps,
        {
          id,
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const defaultOpts = {
  immediate: true
};
class TimeoutFn {
  #opts;
  #interval;
  #cb;
  #timer = null;
  constructor(cb, interval, opts = {}) {
    this.#cb = cb;
    this.#interval = interval;
    this.#opts = { ...defaultOpts, ...opts };
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    if (this.#opts.immediate && DEV) ;
    onDestroyEffect(this.stop);
  }
  #clear() {
    if (this.#timer !== null) {
      window.clearTimeout(this.#timer);
      this.#timer = null;
    }
  }
  stop() {
    this.#clear();
  }
  start(...args) {
    this.#clear();
    this.#timer = window.setTimeout(() => {
      this.#timer = null;
      this.#cb(...args);
    }, this.#interval);
  }
}
const tooltipAttrs = createBitsAttrs({
  component: "tooltip",
  parts: ["content", "trigger"]
});
const TooltipProviderContext = new Context$1("Tooltip.Provider");
const TooltipRootContext = new Context$1("Tooltip.Root");
class TooltipProviderState {
  static create(opts) {
    return TooltipProviderContext.set(new TooltipProviderState(opts));
  }
  opts;
  isOpenDelayed = true;
  isPointerInTransit = box(false);
  #timerFn;
  #openTooltip = null;
  constructor(opts) {
    this.opts = opts;
    this.#timerFn = new TimeoutFn(
      () => {
        this.isOpenDelayed = true;
      },
      this.opts.skipDelayDuration.current,
      { immediate: false }
    );
  }
  #startTimer = () => {
    const skipDuration = this.opts.skipDelayDuration.current;
    if (skipDuration === 0) {
      return;
    } else {
      this.#timerFn.start();
    }
  };
  #clearTimer = () => {
    this.#timerFn.stop();
  };
  onOpen = (tooltip) => {
    if (this.#openTooltip && this.#openTooltip !== tooltip) {
      this.#openTooltip.handleClose();
    }
    this.#clearTimer();
    this.isOpenDelayed = false;
    this.#openTooltip = tooltip;
  };
  onClose = (tooltip) => {
    if (this.#openTooltip === tooltip) {
      this.#openTooltip = null;
    }
    this.#startTimer();
  };
  isTooltipOpen = (tooltip) => {
    return this.#openTooltip === tooltip;
  };
}
class TooltipRootState {
  static create(opts) {
    return TooltipRootContext.set(new TooltipRootState(opts, TooltipProviderContext.get()));
  }
  opts;
  provider;
  #delayDuration = derived(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
  get delayDuration() {
    return this.#delayDuration();
  }
  set delayDuration($$value) {
    return this.#delayDuration($$value);
  }
  #disableHoverableContent = derived(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
  get disableHoverableContent() {
    return this.#disableHoverableContent();
  }
  set disableHoverableContent($$value) {
    return this.#disableHoverableContent($$value);
  }
  #disableCloseOnTriggerClick = derived(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
  get disableCloseOnTriggerClick() {
    return this.#disableCloseOnTriggerClick();
  }
  set disableCloseOnTriggerClick($$value) {
    return this.#disableCloseOnTriggerClick($$value);
  }
  #disabled = derived(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
  get disabled() {
    return this.#disabled();
  }
  set disabled($$value) {
    return this.#disabled($$value);
  }
  #ignoreNonKeyboardFocus = derived(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
  get ignoreNonKeyboardFocus() {
    return this.#ignoreNonKeyboardFocus();
  }
  set ignoreNonKeyboardFocus($$value) {
    return this.#ignoreNonKeyboardFocus($$value);
  }
  contentNode = null;
  triggerNode = null;
  #wasOpenDelayed = false;
  #timerFn;
  #stateAttr = derived(() => {
    if (!this.opts.open.current) return "closed";
    return this.#wasOpenDelayed ? "delayed-open" : "instant-open";
  });
  get stateAttr() {
    return this.#stateAttr();
  }
  set stateAttr($$value) {
    return this.#stateAttr($$value);
  }
  constructor(opts, provider) {
    this.opts = opts;
    this.provider = provider;
    this.#timerFn = new TimeoutFn(
      () => {
        this.#wasOpenDelayed = true;
        this.opts.open.current = true;
      },
      this.delayDuration ?? 0,
      { immediate: false }
    );
    new OpenChangeComplete({
      open: this.opts.open,
      ref: box.with(() => this.contentNode),
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
    watch(() => this.delayDuration, () => {
      if (this.delayDuration === void 0) return;
      this.#timerFn = new TimeoutFn(
        () => {
          this.#wasOpenDelayed = true;
          this.opts.open.current = true;
        },
        this.delayDuration,
        { immediate: false }
      );
    });
    watch(() => this.opts.open.current, (isOpen) => {
      if (isOpen) {
        this.provider.onOpen(this);
      } else {
        this.provider.onClose(this);
      }
    });
  }
  handleOpen = () => {
    this.#timerFn.stop();
    this.#wasOpenDelayed = false;
    this.opts.open.current = true;
  };
  handleClose = () => {
    this.#timerFn.stop();
    this.opts.open.current = false;
  };
  #handleDelayedOpen = () => {
    this.#timerFn.stop();
    const shouldSkipDelay = !this.provider.isOpenDelayed;
    const delayDuration = this.delayDuration ?? 0;
    if (shouldSkipDelay || delayDuration === 0) {
      this.#wasOpenDelayed = delayDuration > 0 && shouldSkipDelay;
      this.opts.open.current = true;
    } else {
      this.#timerFn.start();
    }
  };
  onTriggerEnter = () => {
    this.#handleDelayedOpen();
  };
  onTriggerLeave = () => {
    if (this.disableHoverableContent) {
      this.handleClose();
    } else {
      this.#timerFn.stop();
    }
  };
}
class TooltipTriggerState {
  static create(opts) {
    return new TooltipTriggerState(opts, TooltipRootContext.get());
  }
  opts;
  root;
  attachment;
  #isPointerDown = box(false);
  #hasPointerMoveOpened = false;
  #isDisabled = derived(() => this.opts.disabled.current || this.root.disabled);
  domContext;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.domContext = new DOMContext(opts.ref);
    this.attachment = attachRef(this.opts.ref, (v) => this.root.triggerNode = v);
  }
  handlePointerUp = () => {
    this.#isPointerDown.current = false;
  };
  #onpointerup = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = false;
  };
  #onpointerdown = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = true;
    this.domContext.getDocument().addEventListener(
      "pointerup",
      () => {
        this.handlePointerUp();
      },
      { once: true }
    );
  };
  #onpointermove = (e) => {
    if (this.#isDisabled()) return;
    if (e.pointerType === "touch") return;
    if (this.#hasPointerMoveOpened) return;
    if (this.root.provider.isPointerInTransit.current) return;
    this.root.onTriggerEnter();
    this.#hasPointerMoveOpened = true;
  };
  #onpointerleave = () => {
    if (this.#isDisabled()) return;
    this.root.onTriggerLeave();
    this.#hasPointerMoveOpened = false;
  };
  #onfocus = (e) => {
    if (this.#isPointerDown.current || this.#isDisabled()) return;
    if (this.root.ignoreNonKeyboardFocus && !isFocusVisible(e.currentTarget)) return;
    this.root.handleOpen();
  };
  #onblur = () => {
    if (this.#isDisabled()) return;
    this.root.handleClose();
  };
  #onclick = () => {
    if (this.root.disableCloseOnTriggerClick || this.#isDisabled()) return;
    this.root.handleClose();
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-describedby": this.root.opts.open.current ? this.root.contentNode?.id : void 0,
    "data-state": this.root.stateAttr,
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "data-delay-duration": `${this.root.delayDuration}`,
    [tooltipAttrs.trigger]: "",
    tabindex: this.#isDisabled() ? void 0 : 0,
    disabled: this.opts.disabled.current,
    onpointerup: this.#onpointerup,
    onpointerdown: this.#onpointerdown,
    onpointermove: this.#onpointermove,
    onpointerleave: this.#onpointerleave,
    onfocus: this.#onfocus,
    onblur: this.#onblur,
    onclick: this.#onclick,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TooltipContentState {
  static create(opts) {
    return new TooltipContentState(opts, TooltipRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
    new GraceArea({
      triggerNode: () => this.root.triggerNode,
      contentNode: () => this.root.contentNode,
      enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent,
      onPointerExit: () => {
        if (this.root.provider.isTooltipOpen(this.root)) {
          this.root.handleClose();
        }
      },
      setIsPointerInTransit: (value) => {
        this.root.provider.isPointerInTransit.current = value;
      },
      transitTimeout: this.root.provider.opts.skipDelayDuration.current
    });
  }
  onInteractOutside = (e) => {
    if (isElement(e.target) && this.root.triggerNode?.contains(e.target) && this.root.disableCloseOnTriggerClick) {
      e.preventDefault();
      return;
    }
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current?.(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onOpenAutoFocus = (e) => {
    e.preventDefault();
  };
  onCloseAutoFocus = (e) => {
    e.preventDefault();
  };
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": this.root.stateAttr,
    "data-disabled": getDataDisabled(this.root.disabled),
    style: { pointerEvents: "auto", outline: "none" },
    [tooltipAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown,
    onOpenAutoFocus: this.onOpenAutoFocus,
    onCloseAutoFocus: this.onCloseAutoFocus
  };
}
function Tooltip($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    disabled,
    delayDuration,
    disableCloseOnTriggerClick,
    disableHoverableContent,
    ignoreNonKeyboardFocus,
    children
  } = $$props;
  TooltipRootState.create({
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    }),
    delayDuration: box.with(() => delayDuration),
    disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
    disableHoverableContent: box.with(() => disableHoverableContent),
    ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
    disabled: box.with(() => disabled),
    onOpenChangeComplete: box.with(() => onOpenChangeComplete)
  });
  Floating_layer($$payload, {
    tooltip: true,
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    }
  });
  bind_props($$props, { open });
  pop();
}
function Tooltip_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    side = "top",
    sideOffset = 0,
    align = "center",
    avoidCollisions = true,
    arrowPadding = 0,
    sticky = "partial",
    hideWhenDetached = false,
    collisionPadding = 0,
    onInteractOutside = noop,
    onEscapeKeydown = noop,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = TooltipContentState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    onInteractOutside: box.with(() => onInteractOutside),
    onEscapeKeydown: box.with(() => onEscapeKeydown)
  });
  const floatingProps = {
    side,
    sideOffset,
    align,
    avoidCollisions,
    arrowPadding,
    sticky,
    hideWhenDetached,
    collisionPadding
  };
  const mergedProps = mergeProps(restProps, floatingProps, contentState.props);
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const mergedProps2 = mergeProps(props, {
          style: getFloatingContentCSSVars("tooltip")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: mergedProps2,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps }, null)}><div${spread_attributes({ ...mergedProps2 }, null)}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        contentState.popperProps,
        {
          enabled: contentState.root.opts.open.current,
          id,
          trapFocus: false,
          loop: false,
          preventScroll: false,
          forceMount: true,
          ref: contentState.opts.ref,
          tooltip: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else if (!forceMount) {
    $$payload.out += "<!--[1-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const mergedProps2 = mergeProps(props, {
          style: getFloatingContentCSSVars("tooltip")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: mergedProps2,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps }, null)}><div${spread_attributes({ ...mergedProps2 }, null)}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer($$payload, spread_props([
        mergedProps,
        contentState.popperProps,
        {
          open: contentState.root.opts.open.current,
          id,
          trapFocus: false,
          loop: false,
          preventScroll: false,
          forceMount: false,
          ref: contentState.opts.ref,
          tooltip: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tooltip_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    disabled = false,
    type = "button",
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = TooltipTriggerState.create({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  Floating_layer_anchor($$payload, {
    id,
    ref: triggerState.opts.ref,
    tooltip: true,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></button>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  bind_props($$props, { ref });
  pop();
}
function Tooltip_arrow($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Floating_layer_arrow($$payload2, spread_props([
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tooltip_provider($$payload, $$props) {
  push();
  let {
    children,
    delayDuration = 700,
    disableCloseOnTriggerClick = false,
    disableHoverableContent = false,
    disabled = false,
    ignoreNonKeyboardFocus = false,
    skipDelayDuration = 300
  } = $$props;
  TooltipProviderState.create({
    delayDuration: box.with(() => delayDuration),
    disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
    disableHoverableContent: box.with(() => disableHoverableContent),
    disabled: box.with(() => disabled),
    ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
    skipDelayDuration: box.with(() => skipDelayDuration)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Tooltip_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tooltip_trigger$1($$payload2, spread_props([
      { "data-slot": "tooltip-trigger" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tooltip_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 0,
    side = "top",
    children,
    arrowClasses,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Tooltip_content$1($$payload3, spread_props([
          {
            "data-slot": "tooltip-content",
            sideOffset,
            side,
            class: cn$1("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-tooltip-content-transform-origin) z-50 w-fit text-balance rounded-md px-3 py-1.5 text-xs", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!----> <!---->`;
              {
                let child = function($$payload5, { props }) {
                  $$payload5.out += `<div${spread_attributes(
                    {
                      class: clsx(cn$1("bg-primary z-50 size-2.5 rotate-45 rounded-[2px]", "data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%_+_2px)]", "data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%_+_1px)]", "data-[side=right]:translate-x-[calc(50%_+_2px)] data-[side=right]:translate-y-1/2", "data-[side=left]:-translate-y-[calc(50%_-_3px)]", arrowClasses)),
                      ...props
                    },
                    null
                  )}></div>`;
                };
                Tooltip_arrow($$payload4, { child, $$slots: { child: true } });
              }
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$1 = Tooltip;
const Provider = Tooltip_provider;
const sidebarMenuButtonVariants = tv({
  base: "peer/menu-button outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground group-has-data-[sidebar=menu-action]/menu-item:pr-8 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "group-data-[collapsible=icon]:p-0! h-12 text-sm"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Sidebar_menu_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    child,
    variant = "default",
    size = "default",
    isActive = false,
    tooltipContent,
    tooltipContentProps,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sidebar = useSidebar();
  const buttonProps = {
    class: cn$1(sidebarMenuButtonVariants({ variant, size }), className),
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-active": isActive,
    ...restProps
  };
  function Button2($$payload2, { props }) {
    const mergedProps = mergeProps(buttonProps, props);
    if (child) {
      $$payload2.out += "<!--[-->";
      child($$payload2, { props: mergedProps });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
      children?.($$payload2);
      $$payload2.out += `<!----></button>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  if (!tooltipContent) {
    $$payload.out += "<!--[-->";
    Button2($$payload, {});
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Root$1($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        {
          let child2 = function($$payload3, { props }) {
            Button2($$payload3, { props });
          };
          Tooltip_trigger($$payload2, { child: child2, $$slots: { child: true } });
        }
        $$payload2.out += `<!----> <!---->`;
        Tooltip_content($$payload2, spread_props([
          {
            side: "right",
            align: "center",
            hidden: sidebar.state !== "collapsed" || sidebar.isMobile
          },
          tooltipContentProps,
          {
            children: ($$payload3) => {
              if (typeof tooltipContent === "string") {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `${escape_html(tooltipContent)}`;
              } else if (tooltipContent) {
                $$payload3.out += "<!--[1-->";
                tooltipContent($$payload3);
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_menu_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<li${spread_attributes(
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      class: clsx(cn$1("group/menu-item relative", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></li>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_menu($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<ul${spread_attributes(
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      class: clsx(cn$1("flex w-full min-w-0 flex-col gap-1", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></ul>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_provider($$payload, $$props) {
  push();
  let {
    ref = null,
    open = true,
    onOpenChange = () => {
    },
    class: className,
    style,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  setSidebar({
    open: () => open,
    setOpen: (value) => {
      open = value;
      onOpenChange(value);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  });
  $$payload.out += `<!---->`;
  Provider($$payload, {
    delayDuration: 0,
    children: ($$payload2) => {
      $$payload2.out += `<div${spread_attributes(
        {
          "data-slot": "sidebar-wrapper",
          style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH)}; --sidebar-width-icon: ${stringify(SIDEBAR_WIDTH_ICON)}; ${stringify(style)}`,
          class: clsx(cn$1("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className)),
          ...restProps
        },
        null
      )}>`;
      children?.($$payload2);
      $$payload2.out += `<!----></div>`;
    }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref, open });
  pop();
}
function Separator($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Separator$1($$payload2, spread_props([
      {
        "data-slot": "separator",
        class: cn$1("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Panel_left($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M9 3v18" }]
  ];
  Icon($$payload, spread_props([
    { name: "panel-left" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Sidebar_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    onclick,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sidebar = useSidebar();
  Button($$payload, spread_props([
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      class: cn$1("size-7", className),
      type: "button",
      onclick: (e) => {
        onclick?.(e);
        sidebar.toggle();
      }
    },
    restProps,
    {
      children: ($$payload2) => {
        Panel_left($$payload2, {});
        $$payload2.out += `<!----> <span class="sr-only">Toggle Sidebar</span>`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { ref });
  pop();
}
function Sheet_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay($$payload2, spread_props([
      {
        "data-slot": "sheet-overlay",
        class: cn$1("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const sheetVariants = tv({
  base: "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  variants: {
    side: {
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
      bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
    }
  },
  defaultVariants: { side: "right" }
});
function Sheet_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    side = "right",
    portalProps,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          Sheet_overlay($$payload3, {});
          $$payload3.out += `<!----> <!---->`;
          Dialog_content($$payload3, spread_props([
            {
              "data-slot": "sheet-content",
              class: cn$1(sheetVariants({ side }), className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              children: ($$payload4) => {
                children?.($$payload4);
                $$payload4.out += `<!----> <!---->`;
                Dialog_close($$payload4, {
                  class: "ring-offset-background focus-visible:ring-ring rounded-xs focus-visible:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
                  children: ($$payload5) => {
                    X($$payload5, { class: "size-4" });
                    $$payload5.out += `<!----> <span class="sr-only">Close</span>`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Sheet_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "sheet-header",
      class: clsx(cn$1("flex flex-col gap-1.5 p-4", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sheet_title($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_title($$payload2, spread_props([
      {
        "data-slot": "sheet-title",
        class: cn$1("text-foreground font-semibold", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Sheet_description($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_description($$payload2, spread_props([
      {
        "data-slot": "sheet-description",
        class: cn$1("text-muted-foreground text-sm", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root = Dialog;
function Sidebar($$payload, $$props) {
  push();
  let {
    ref = null,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sidebar = useSidebar();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (collapsible === "none") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${spread_attributes(
        {
          class: clsx(cn$1("bg-sidebar text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col", className)),
          ...restProps
        },
        null
      )}>`;
      children?.($$payload2);
      $$payload2.out += `<!----></div>`;
    } else if (sidebar.isMobile) {
      $$payload2.out += "<!--[1-->";
      var bind_get = () => sidebar.openMobile;
      var bind_set = (v) => sidebar.setOpenMobile(v);
      $$payload2.out += `<!---->`;
      Root($$payload2, spread_props([
        {
          get open() {
            return bind_get();
          },
          set open($$value) {
            bind_set($$value);
          }
        },
        restProps,
        {
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            Sheet_content($$payload3, {
              "data-sidebar": "sidebar",
              "data-slot": "sidebar",
              "data-mobile": "true",
              class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
              style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH_MOBILE)};`,
              side,
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Sheet_header($$payload4, {
                  class: "sr-only",
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->`;
                    Sheet_title($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->Sidebar`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!----> <!---->`;
                    Sheet_description($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->Displays the mobile sidebar.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <div class="flex h-full w-full flex-col">`;
                children?.($$payload4);
                $$payload4.out += `<!----></div>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        }
      ]));
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="text-sidebar-foreground group peer hidden md:block"${attr("data-state", sidebar.state)}${attr("data-collapsible", sidebar.state === "collapsed" ? collapsible : "")}${attr("data-variant", variant)}${attr("data-side", side)} data-slot="sidebar"><div data-slot="sidebar-gap"${attr_class(clsx(cn$1("w-(--sidebar-width) relative bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")))}></div> <div${spread_attributes(
        {
          "data-slot": "sidebar-container",
          class: clsx(cn$1(
            "w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )),
          ...restProps
        },
        null
      )}><div data-sidebar="sidebar" data-slot="sidebar-inner" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm">`;
      children?.($$payload2);
      $$payload2.out += `<!----></div></div></div>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_trigger$1($$payload2, spread_props([
      { "data-slot": "dialog-trigger" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<nav${spread_attributes(
    {
      "data-slot": "breadcrumb",
      class: clsx(className),
      "aria-label": "breadcrumb",
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></nav>`;
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<li${spread_attributes(
    {
      "data-slot": "breadcrumb-item",
      class: clsx(cn$1("inline-flex items-center gap-1.5", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></li>`;
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb_separator($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<li${spread_attributes(
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      class: clsx(cn$1("[&>svg]:size-3.5", className)),
      ...restProps
    },
    null
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    Chevron_right($$payload, {});
  }
  $$payload.out += `<!--]--></li>`;
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb_link($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    href = void 0,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const attrs = {
    "data-slot": "breadcrumb-link",
    class: cn$1("hover:text-foreground transition-colors", className),
    href,
    ...restProps
  };
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: attrs });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${spread_attributes({ ...attrs }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></a>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb_list($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<ol${spread_attributes(
    {
      "data-slot": "breadcrumb-list",
      class: clsx(cn$1("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></ol>`;
  bind_props($$props, { ref });
  pop();
}
function Breadcrumb_page($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<span${spread_attributes(
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      class: clsx(cn$1("text-foreground font-normal", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></span>`;
  bind_props($$props, { ref });
  pop();
}
function Collapsible($$payload, $$props) {
  push();
  let {
    ref = null,
    open = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible$1($$payload2, spread_props([
      { "data-slot": "collapsible" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, open });
  pop();
}
function Collapsible_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible_trigger$1($$payload2, spread_props([
      { "data-slot": "collapsible-trigger" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Collapsible_content($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible_content$1($$payload2, spread_props([
      { "data-slot": "collapsible-content" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Mode_watcher_lite($$payload, $$props) {
  push();
  let { themeColors: themeColors2 } = $$props;
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let { trueNonce = "", initConfig, themeColors: themeColors2 } = $$props;
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let {
    defaultMode = "system",
    themeColors: themeColorsProp,
    disableTransitions: disableTransitionsProp = true,
    darkClassNames: darkClassNamesProp = ["dark"],
    lightClassNames: lightClassNamesProp = [],
    defaultTheme = "",
    nonce = "",
    themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
    modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
    disableHeadScriptInjection = false,
    synchronousModeChanges: synchronousModeChangesProp = false
  } = $$props;
  modeStorageKey.current = modeStorageKeyProp;
  themeStorageKey.current = themeStorageKeyProp;
  darkClassNames.current = darkClassNamesProp;
  lightClassNames.current = lightClassNamesProp;
  disableTransitions.current = disableTransitionsProp;
  themeColors.current = themeColorsProp;
  synchronousModeChanges.current = synchronousModeChangesProp;
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColorsProp,
    darkClassNames: darkClassNamesProp,
    lightClassNames: lightClassNamesProp,
    defaultTheme,
    modeStorageKey: modeStorageKeyProp,
    themeStorageKey: themeStorageKeyProp
  });
  const trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors.current });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, {
      trueNonce,
      initConfig,
      themeColors: themeColors.current
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function House($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      }
    ],
    [
      "path",
      {
        "d": "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "house" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Dog($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M11.25 16.25h1.5L12 17z" }],
    ["path", { "d": "M16 14v.5" }],
    [
      "path",
      {
        "d": "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"
      }
    ],
    ["path", { "d": "M8 14v.5" }],
    [
      "path",
      {
        "d": "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "dog" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Scan_text($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { "d": "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { "d": "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { "d": "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["path", { "d": "M7 8h8" }],
    ["path", { "d": "M7 12h10" }],
    ["path", { "d": "M7 16h6" }]
  ];
  Icon($$payload, spread_props([
    { name: "scan-text" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
const navItems = [
  { title: "Dashboard", url: "/", icon: House },
  { title: "Animals", url: "/animals", icon: Dog },
  { title: "Scan logs", url: "/scan-logs", icon: Scan_text }
  // { title: "Health Checks", url: "/health_checks", icon: HeartPulse },
  // { title: "Adoptions", url: "/adoptions", icon: FileHeart },
  // { title: "Roster", url: "/roster", icon: Calendar },
];
const devPlaygroundItems = [
  { title: "Auth", url: "/auth", icon: User },
  { title: "Realtime Testing", url: "/realtime_test", icon: Scan_text }
];
function App_sidebar($$payload, $$props) {
  push();
  var $$store_subs;
  let currentUserEmail = store_get($$store_subs ??= {}, "$page", page).data?.user?.email || null;
  let currentUserName = `${store_get($$store_subs ??= {}, "$page", page).data?.userProfile?.first_name || ""} ${store_get($$store_subs ??= {}, "$page", page).data?.userProfile?.last_name || ""}`.trim() || null;
  let { supabase: supabase2 } = store_get($$store_subs ??= {}, "$page", page).data;
  let currentActiveItem = (() => {
    const pathname = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const navItem = navItems.find((item) => item.url === pathname);
    if (navItem) return navItem.title;
    if (pathname === "/private") return "User Profile";
    return "Dashboard";
  })();
  const handleSignOut = async () => {
    const { error } = await supabase2.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto();
    }
  };
  $$payload.out += `<!---->`;
  Sidebar($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Sidebar_header($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center gap-2"><div class="bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">`;
          Rabbit($$payload3, { class: "size-6" });
          $$payload3.out += `<!----></div> <div class="flex flex-col leading-none justify-center"><span class="text-lg">Shelter Sync</span> <span>v1.0</span></div></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Sidebar_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Sidebar_group($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Sidebar_group_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Sidebar_menu($$payload5, {
                    class: "space-y-2",
                    children: ($$payload6) => {
                      const each_array = ensure_array_like(navItems);
                      $$payload6.out += `<!--[-->`;
                      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                        let item = each_array[$$index];
                        $$payload6.out += `<!---->`;
                        Sidebar_menu_item($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->`;
                            {
                              let child = function($$payload8, { props }) {
                                $$payload8.out += `<a${spread_attributes({ href: item.url, ...props }, null)}><!---->`;
                                item.icon($$payload8, {});
                                $$payload8.out += `<!----> <span>${escape_html(item.title)}</span></a>`;
                              };
                              Sidebar_menu_button($$payload7, {
                                class: `text-lg border border-sidebar-border ${stringify(currentActiveItem === item.title ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "")}`,
                                size: "m",
                                child,
                                $$slots: { child: true }
                              });
                            }
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Collapsible($$payload3, {
            open: false,
            class: "group/collapsible",
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Sidebar_group($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  {
                    let child = function($$payload6, { props }) {
                      $$payload6.out += `<!---->`;
                      Collapsible_trigger($$payload6, spread_props([
                        props,
                        {
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->Dev Playground `;
                            Chevron_left($$payload7, {
                              class: "ml-auto transition-transform group-data-[state=open]/collapsible:-rotate-90"
                            });
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                      $$payload6.out += `<!---->`;
                    };
                    Sidebar_group_label($$payload5, { child, $$slots: { child: true } });
                  }
                  $$payload5.out += `<!----> <!---->`;
                  Collapsible_content($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Sidebar_menu($$payload6, {
                        children: ($$payload7) => {
                          const each_array_1 = ensure_array_like(devPlaygroundItems);
                          $$payload7.out += `<!--[-->`;
                          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                            let item = each_array_1[$$index_1];
                            $$payload7.out += `<!---->`;
                            Sidebar_menu_item($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                {
                                  let child = function($$payload9, { props }) {
                                    $$payload9.out += `<a${spread_attributes({ href: item.url, ...props }, null)}><!---->`;
                                    item.icon($$payload9, {});
                                    $$payload9.out += `<!----> <span>${escape_html(item.title)}</span></a>`;
                                  };
                                  Sidebar_menu_button($$payload8, { child, $$slots: { child: true } });
                                }
                                $$payload8.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Sidebar_footer($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Sidebar_menu($$payload3, {
            class: "space-y-2",
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Sidebar_menu_item($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Sidebar_menu_button($$payload5, {
                    class: `border border-sidebar-border cursor-pointer ${stringify(currentActiveItem === "User Profile" ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "")}`,
                    onclick: () => goto(),
                    children: ($$payload6) => {
                      User($$payload6, {});
                      $$payload6.out += `<!----> <span>User Profile</span>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->  <!---->`;
              Sidebar_menu_item($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Sidebar_menu_button($$payload5, {
                    class: "border border-sidebar-border cursor-pointer",
                    onclick: handleSignOut,
                    children: ($$payload6) => {
                      Log_out($$payload6, {});
                      $$payload6.out += `<!----> <span>Sign out</span>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Sidebar_menu_item($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<div class="flex items-center gap-2"><div class="bg-primary text-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">`;
                  User($$payload5, { class: "size-6" });
                  $$payload5.out += `<!----></div> <div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-medium">${escape_html(currentUserName || "Hello?")}</span> <span class="text-muted-foreground truncate text-xs">${escape_html(currentUserEmail || "No user logged in")}</span></div></div>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Mobile_bottom_tabs($$payload, $$props) {
  push();
  var $$store_subs;
  let activeTab = (() => {
    const pathname = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const navItem = navItems.find((item) => item.url === pathname);
    if (navItem) return navItem.title;
    if (pathname === "/private") return "User Info";
    return "Dashboard";
  })();
  const allTabs = [
    ...navItems,
    {
      title: "User Info",
      url: "/private",
      icon: User
    }
  ];
  const each_array = ensure_array_like(allTabs);
  $$payload.out += `<div class="w-full h-full bg-background border-t"><div class="flex w-full h-full"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tab = each_array[$$index];
    const IconComponent = tab.icon;
    $$payload.out += `<button${attr_class(`flex-1 flex flex-col items-center justify-center gap-1 p-2 h-full transition-colors duration-200 ${stringify(activeTab === tab.title ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground")}`)} type="button"><!---->`;
    IconComponent($$payload, { class: "h-6 w-6 shrink-0" });
    $$payload.out += `<!----> <span class="text-xs leading-tight text-center">${escape_html(tab.title === "User Info" ? "Profile" : tab.title)}</span></button>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const badgeVariants = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
      secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
      destructive: "bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
    }
  },
  defaultVariants: { variant: "default" }
});
function Badge($$payload, $$props) {
  push();
  let {
    ref = null,
    href,
    class: className,
    variant = "default",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  element(
    $$payload,
    href ? "a" : "span",
    () => {
      $$payload.out += `${spread_attributes(
        {
          "data-slot": "badge",
          href,
          class: clsx(cn$1(badgeVariants({ variant }), className)),
          ...restProps
        },
        null
      )}`;
    },
    () => {
      children?.($$payload);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_scrollbar($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area_scrollbar$1($$payload2, spread_props([
      {
        "data-slot": "scroll-area-scrollbar",
        orientation,
        class: cn$1("flex touch-none select-none p-px transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          children?.($$payload3);
          $$payload3.out += `<!----> <!---->`;
          Scroll_area_thumb($$payload3, {
            "data-slot": "scroll-area-thumb",
            class: "bg-border relative flex-1 rounded-full"
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Scroll_area($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area$1($$payload2, spread_props([
      {
        "data-slot": "scroll-area",
        class: cn$1("relative", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Scroll_area_viewport($$payload3, {
            "data-slot": "scroll-area-viewport",
            class: "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-4",
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          if (orientation === "vertical" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "vertical",
              class: scrollbarYClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (orientation === "horizontal" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "horizontal",
              class: scrollbarXClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Scroll_area_corner($$payload3, {});
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_group($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  $$payload.out += `<!---->`;
  Select_group$1($$payload, spread_props([{ "data-slot": "select-group" }, restProps]));
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Select_label($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "select-label",
      class: clsx(cn$1("text-muted-foreground px-2 py-1.5 text-xs", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Command($$payload, $$props) {
  push();
  let {
    ref = null,
    value = "",
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command$1($$payload2, spread_props([
      {
        "data-slot": "command",
        class: cn$1("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className)
      },
      restProps,
      {
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Command_empty($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command_empty$1($$payload2, spread_props([
      {
        "data-slot": "command-empty",
        class: cn$1("py-6 text-center text-sm", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Command_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command_item$1($$payload2, spread_props([
      {
        "data-slot": "command-item",
        class: cn$1("aria-selected:bg-accent aria-selected:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Command_input($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value = "",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex h-9 items-center gap-2 border-b pl-3 pr-8" data-slot="command-input-wrapper">`;
    Search($$payload2, { class: "size-4 shrink-0 opacity-50" });
    $$payload2.out += `<!----> <!---->`;
    Command_input$1($$payload2, spread_props([
      {
        "data-slot": "command-input",
        class: cn$1("placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Command_list($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Command_list$1($$payload2, spread_props([
      {
        "data-slot": "command-list",
        class: cn$1("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const bars = Array(12).fill(0);
function Loader($$payload, $$props) {
  push();
  let { visible, class: className } = $$props;
  const each_array = ensure_array_like(bars);
  $$payload.out += `<div${attr_class(clsx(["sonner-loading-wrapper", className].filter(Boolean).join(" ")))}${attr("data-visible", visible)}><div class="sonner-spinner"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$payload.out += `<div class="sonner-loading-bar"></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const isBrowser = typeof document !== "undefined";
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
const sonnerContext = new Context("<Toaster/>");
let toastsCounter = 0;
class ToastState {
  toasts = [];
  heights = [];
  #findToastIdx = (id) => {
    const idx = this.toasts.findIndex((toast2) => toast2.id === id);
    if (idx === -1) return null;
    return idx;
  };
  addToast = (data) => {
    if (!isBrowser) return;
    this.toasts.unshift(data);
  };
  updateToast = ({ id, data, type, message }) => {
    const toastIdx = this.toasts.findIndex((toast2) => toast2.id === id);
    const toastToUpdate = this.toasts[toastIdx];
    this.toasts[toastIdx] = {
      ...toastToUpdate,
      ...data,
      id,
      title: message,
      type,
      updated: true
    };
  };
  create = (data) => {
    const { message, ...rest } = data;
    const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    run(() => {
      const alreadyExists = this.toasts.find((toast2) => toast2.id === id);
      if (alreadyExists) {
        this.updateToast({ id, data, type, message, dismissable });
      } else {
        this.addToast({
          ...rest,
          id,
          title: message,
          dismissable,
          type
        });
      }
    });
    return id;
  };
  dismiss = (id) => {
    run(() => {
      if (id === void 0) {
        this.toasts = this.toasts.map((toast2) => ({ ...toast2, dismiss: true }));
        return;
      }
      const toastIdx = this.toasts.findIndex((toast2) => toast2.id === id);
      if (this.toasts[toastIdx]) {
        this.toasts[toastIdx] = { ...this.toasts[toastIdx], dismiss: true };
      }
    });
    return id;
  };
  remove = (id) => {
    if (id === void 0) {
      this.toasts = [];
      return;
    }
    const toastIdx = this.#findToastIdx(id);
    if (toastIdx === null) return;
    this.toasts.splice(toastIdx, 1);
    return id;
  };
  message = (message, data) => {
    return this.create({ ...data, type: "default", message });
  };
  error = (message, data) => {
    return this.create({ ...data, type: "error", message });
  };
  success = (message, data) => {
    return this.create({ ...data, type: "success", message });
  };
  info = (message, data) => {
    return this.create({ ...data, type: "info", message });
  };
  warning = (message, data) => {
    return this.create({ ...data, type: "warning", message });
  };
  loading = (message, data) => {
    return this.create({ ...data, type: "loading", message });
  };
  promise = (promise, data) => {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = this.create({
        ...data,
        promise,
        type: "loading",
        message: typeof data.loading === "string" ? data.loading : data.loading()
      });
    }
    const p2 = promise instanceof Promise ? promise : promise();
    let shouldDismiss = id !== void 0;
    p2.then((response) => {
      if (typeof response === "object" && response && "ok" in response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message = constructPromiseErrorMessage(response);
        this.create({ id, type: "error", message });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message = typeof data.success === "function" ? data.success(response) : data.success;
        this.create({ id, type: "success", message });
      }
    }).catch((error) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message = typeof data.error === "function" ? data.error(error) : data.error;
        this.create({ id, type: "error", message });
      }
    }).finally(() => {
      if (shouldDismiss) {
        this.dismiss(id);
        id = void 0;
      }
      data.finally?.();
    });
    return id;
  };
  custom = (component, data) => {
    const id = data?.id || toastsCounter++;
    this.create({ component, id, ...data });
    return id;
  };
  removeHeight = (id) => {
    this.heights = this.heights.filter((height) => height.toastId !== id);
  };
  setHeight = (data) => {
    const toastIdx = this.#findToastIdx(data.toastId);
    if (toastIdx === null) {
      this.heights.push(data);
      return;
    }
    this.heights[toastIdx] = data;
  };
  reset = () => {
    this.toasts = [];
    this.heights = [];
  };
}
function constructPromiseErrorMessage(response) {
  if (response && typeof response === "object" && "status" in response) {
    return `HTTP error! Status: ${response.status}`;
  }
  return `Error! ${response}`;
}
const toastState = new ToastState();
function toastFunction(message, data) {
  return toastState.create({ message, ...data });
}
class SonnerState {
  /**
   * A derived state of the toasts that are not dismissed.
   */
  #activeToasts = derived(() => toastState.toasts.filter((toast2) => !toast2.dismiss));
  get toasts() {
    return this.#activeToasts();
  }
}
const basicToast = toastFunction;
const toast = Object.assign(basicToast, {
  success: toastState.success,
  info: toastState.info,
  warning: toastState.warning,
  error: toastState.error,
  custom: toastState.custom,
  message: toastState.message,
  promise: toastState.promise,
  dismiss: toastState.dismiss,
  loading: toastState.loading,
  getActiveToasts: () => {
    return toastState.toasts.filter((toast2) => !toast2.dismiss);
  }
});
function isAction(action) {
  return action.label !== void 0;
}
const TOAST_LIFETIME$1 = 4e3;
const GAP$1 = 14;
const TIME_BEFORE_UNMOUNT = 200;
const DEFAULT_TOAST_CLASSES = {
  toast: "",
  title: "",
  description: "",
  loader: "",
  closeButton: "",
  cancelButton: "",
  actionButton: "",
  action: "",
  warning: "",
  error: "",
  success: "",
  default: "",
  info: "",
  loading: ""
};
function Toast($$payload, $$props) {
  push();
  let {
    toast: toast2,
    index,
    expanded,
    invert: invertFromToaster,
    position,
    visibleToasts,
    expandByDefault,
    closeButton: closeButtonFromToaster,
    interacting,
    cancelButtonStyle = "",
    actionButtonStyle = "",
    duration: durationFromToaster,
    descriptionClass = "",
    classes: classesProp,
    unstyled = false,
    loadingIcon,
    successIcon,
    errorIcon,
    warningIcon,
    closeIcon,
    infoIcon,
    defaultRichColors = false,
    swipeDirections: swipeDirectionsProp,
    closeButtonAriaLabel,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const defaultClasses = { ...DEFAULT_TOAST_CLASSES };
  let mounted = false;
  let removed = false;
  let swiping = false;
  let swipeOut = false;
  let isSwiped = false;
  let offsetBeforeRemove = 0;
  let initialHeight = 0;
  toast2.duration || durationFromToaster || TOAST_LIFETIME$1;
  let swipeOutDirection = null;
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast2.type;
  const dismissable = toast2.dismissable !== false;
  const toastClass = toast2.class || "";
  const toastDescriptionClass = toast2.descriptionClass || "";
  const heightIndex = toastState.heights.findIndex((height) => height.toastId === toast2.id) || 0;
  const closeButton = toast2.closeButton ?? closeButtonFromToaster;
  toast2.duration ?? durationFromToaster ?? TOAST_LIFETIME$1;
  const coords = position.split("-");
  const toastsHeightBefore = toastState.heights.reduce(
    (prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex) return prev;
      return prev + curr.height;
    },
    0
  );
  const invert = toast2.invert || invertFromToaster;
  const disabled = toastType === "loading";
  const classes = { ...defaultClasses, ...classesProp };
  toast2.title;
  toast2.description;
  const offset = Math.round(heightIndex * GAP$1 + toastsHeightBefore);
  function deleteToast() {
    removed = true;
    offsetBeforeRemove = offset;
    toastState.removeHeight(toast2.id);
    setTimeout(
      () => {
        toastState.remove(toast2.id);
      },
      TIME_BEFORE_UNMOUNT
    );
  }
  toast2.promise && toastType === "loading" || toast2.duration === Number.POSITIVE_INFINITY;
  const icon = (() => {
    if (toast2.icon) return toast2.icon;
    if (toastType === "success") return successIcon;
    if (toastType === "error") return errorIcon;
    if (toastType === "warning") return warningIcon;
    if (toastType === "info") return infoIcon;
    if (toastType === "loading") return loadingIcon;
    return null;
  })();
  function LoadingIcon($$payload2) {
    if (loadingIcon) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(clsx(cn(classes?.loader, toast2?.classes?.loader, "sonner-loader")))}${attr("data-visible", toastType === "loading")}>`;
      loadingIcon($$payload2);
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      Loader($$payload2, {
        class: cn(classes?.loader, toast2.classes?.loader),
        visible: toastType === "loading"
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<li${attr("tabindex", 0)}${attr_class(clsx(cn(restProps.class, toastClass, classes?.toast, toast2?.classes?.toast, classes?.[toastType], toast2?.classes?.[toastType])))} data-sonner-toast=""${attr("data-rich-colors", toast2.richColors ?? defaultRichColors)}${attr("data-styled", !(toast2.component || toast2.unstyled || unstyled))}${attr("data-mounted", mounted)}${attr("data-promise", Boolean(toast2.promise))}${attr("data-swiped", isSwiped)}${attr("data-removed", removed)}${attr("data-visible", isVisible)}${attr("data-y-position", coords[0])}${attr("data-x-position", coords[1])}${attr("data-index", index)}${attr("data-front", isFront)}${attr("data-swiping", swiping)}${attr("data-dismissable", dismissable)}${attr("data-type", toastType)}${attr("data-invert", invert)}${attr("data-swipe-out", swipeOut)}${attr("data-swipe-direction", swipeOutDirection)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted))}${attr_style(`${restProps.style} ${toast2.style}`, {
    "--index": index,
    "--toasts-before": index,
    "--z-index": toastState.toasts.length - index,
    "--offset": `${removed ? offsetBeforeRemove : offset}px`,
    "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`
  })}>`;
  if (closeButton && !toast2.component && toastType !== "loading" && closeIcon !== null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button${attr("aria-label", closeButtonAriaLabel)}${attr("data-disabled", disabled)} data-close-button=""${attr_class(clsx(cn(classes?.closeButton, toast2?.classes?.closeButton)))}>`;
    closeIcon?.($$payload);
    $$payload.out += `<!----></button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (toast2.component) {
    $$payload.out += "<!--[-->";
    const Component = toast2.component;
    $$payload.out += `<!---->`;
    Component($$payload, spread_props([
      toast2.componentProps,
      { closeToast: deleteToast }
    ]));
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    if ((toastType || toast2.icon || toast2.promise) && toast2.icon !== null && (icon !== null || toast2.icon)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-icon=""${attr_class(clsx(cn(classes?.icon, toast2?.classes?.icon)))}>`;
      if (toast2.promise || toastType === "loading") {
        $$payload.out += "<!--[-->";
        if (toast2.icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<!---->`;
          toast2.icon($$payload, {});
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
          LoadingIcon($$payload);
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (toast2.type !== "loading") {
        $$payload.out += "<!--[-->";
        if (toast2.icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<!---->`;
          toast2.icon($$payload, {});
          $$payload.out += `<!---->`;
        } else if (toastType === "success") {
          $$payload.out += "<!--[1-->";
          successIcon?.($$payload);
          $$payload.out += `<!---->`;
        } else if (toastType === "error") {
          $$payload.out += "<!--[2-->";
          errorIcon?.($$payload);
          $$payload.out += `<!---->`;
        } else if (toastType === "warning") {
          $$payload.out += "<!--[3-->";
          warningIcon?.($$payload);
          $$payload.out += `<!---->`;
        } else if (toastType === "info") {
          $$payload.out += "<!--[4-->";
          infoIcon?.($$payload);
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div data-content=""><div data-title=""${attr_class(clsx(cn(classes?.title, toast2?.classes?.title)))}>`;
    if (toast2.title) {
      $$payload.out += "<!--[-->";
      if (typeof toast2.title !== "string") {
        $$payload.out += "<!--[-->";
        const Title = toast2.title;
        $$payload.out += `<!---->`;
        Title($$payload, spread_props([toast2.componentProps]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(toast2.title)}`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (toast2.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-description=""${attr_class(clsx(cn(descriptionClass, toastDescriptionClass, classes?.description, toast2.classes?.description)))}>`;
      if (typeof toast2.description !== "string") {
        $$payload.out += "<!--[-->";
        const Description = toast2.description;
        $$payload.out += `<!---->`;
        Description($$payload, spread_props([toast2.componentProps]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(toast2.description)}`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (toast2.cancel) {
      $$payload.out += "<!--[-->";
      if (typeof toast2.cancel === "function") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        toast2.cancel($$payload, {});
        $$payload.out += `<!---->`;
      } else if (isAction(toast2.cancel)) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<button data-button="" data-cancel=""${attr_style(toast2.cancelButtonStyle ?? cancelButtonStyle)}${attr_class(clsx(cn(classes?.cancelButton, toast2?.classes?.cancelButton)))}>${escape_html(toast2.cancel.label)}</button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (toast2.action) {
      $$payload.out += "<!--[-->";
      if (typeof toast2.action === "function") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        toast2.action($$payload, {});
        $$payload.out += `<!---->`;
      } else if (isAction(toast2.action)) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<button data-button=""${attr_style(toast2.actionButtonStyle ?? actionButtonStyle)}${attr_class(clsx(cn(classes?.actionButton, toast2?.classes?.actionButton)))}>${escape_html(toast2.action.label)}</button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></li>`;
  pop();
}
function SuccessIcon($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`;
}
function ErrorIcon($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`;
}
function WarningIcon($$payload) {
  $$payload.out += `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`;
}
function InfoIcon($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`;
}
function CloseIcon($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
}
const VISIBLE_TOASTS_AMOUNT = 3;
const VIEWPORT_OFFSET = "24px";
const MOBILE_VIEWPORT_OFFSET = "16px";
const TOAST_LIFETIME = 4e3;
const TOAST_WIDTH = 356;
const GAP = 14;
const DARK = "dark";
const LIGHT = "light";
function getOffsetObject(defaultOffset, mobileOffset) {
  const styles = {};
  [defaultOffset, mobileOffset].forEach((offset, index) => {
    const isMobile = index === 1;
    const prefix = isMobile ? "--mobile-offset" : "--offset";
    const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
    function assignAll(offset2) {
      ["top", "right", "bottom", "left"].forEach((key) => {
        styles[`${prefix}-${key}`] = typeof offset2 === "number" ? `${offset2}px` : offset2;
      });
    }
    if (typeof offset === "number" || typeof offset === "string") {
      assignAll(offset);
    } else if (typeof offset === "object") {
      ["top", "right", "bottom", "left"].forEach((key) => {
        const value = offset[key];
        if (value === void 0) {
          styles[`${prefix}-${key}`] = defaultValue;
        } else {
          styles[`${prefix}-${key}`] = typeof value === "number" ? `${value}px` : value;
        }
      });
    } else {
      assignAll(defaultValue);
    }
  });
  return styles;
}
function Toaster($$payload, $$props) {
  push();
  function getInitialTheme(t) {
    if (t !== "system") return t;
    if (typeof window !== "undefined") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return DARK;
      }
      return LIGHT;
    }
    return LIGHT;
  }
  let {
    invert = false,
    position = "bottom-right",
    hotkey = ["altKey", "KeyT"],
    expand = false,
    closeButton = false,
    offset = VIEWPORT_OFFSET,
    mobileOffset = MOBILE_VIEWPORT_OFFSET,
    theme = "light",
    richColors = false,
    duration = TOAST_LIFETIME,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    toastOptions = {},
    dir = "auto",
    gap = GAP,
    loadingIcon: loadingIconProp,
    successIcon: successIconProp,
    errorIcon: errorIconProp,
    warningIcon: warningIconProp,
    closeIcon: closeIconProp,
    infoIcon: infoIconProp,
    containerAriaLabel = "Notifications",
    class: className,
    closeButtonAriaLabel = "Close toast",
    onblur,
    onfocus,
    onmouseenter,
    onmousemove,
    onmouseleave,
    ondragend,
    onpointerdown,
    onpointerup,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function getDocumentDirection() {
    if (dir !== "auto") return dir;
    if (typeof window === "undefined") return "ltr";
    if (typeof document === "undefined") return "ltr";
    const dirAttribute = document.documentElement.getAttribute("dir");
    if (dirAttribute === "auto" || !dirAttribute) {
      run(() => dir = window.getComputedStyle(document.documentElement).direction ?? "ltr");
      return dir;
    }
    run(() => dir = dirAttribute);
    return dirAttribute;
  }
  const possiblePositions = Array.from(new Set([
    position,
    ...toastState.toasts.filter((toast2) => toast2.position).map((toast2) => toast2.position)
  ].filter(Boolean)));
  let expanded = false;
  let interacting = false;
  let actualTheme = getInitialTheme(theme);
  const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  sonnerContext.set(new SonnerState());
  $$payload.out += `<section${attr("aria-label", `${stringify(containerAriaLabel)} ${stringify(hotkeyLabel)}`)}${attr("tabindex", -1)} aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-tppj9g">`;
  if (toastState.toasts.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(possiblePositions);
    $$payload.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let position2 = each_array[index];
      const [y, x] = position2.split("-");
      const offsetObject = getOffsetObject(offset, mobileOffset);
      const each_array_1 = ensure_array_like(toastState.toasts.filter((toast2) => !toast2.position && index === 0 || toast2.position === position2));
      $$payload.out += `<ol${spread_attributes(
        {
          tabindex: -1,
          dir: getDocumentDirection(),
          class: clsx(className),
          "data-sonner-toaster": true,
          "data-sonner-theme": actualTheme,
          "data-y-position": y,
          "data-x-position": x,
          style: restProps.style,
          ...restProps
        },
        "svelte-tppj9g",
        void 0,
        {
          "--front-toast-height": `${toastState.heights[0]?.height}px`,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${gap}px`,
          "--offset-top": offsetObject["--offset-top"],
          "--offset-right": offsetObject["--offset-right"],
          "--offset-bottom": offsetObject["--offset-bottom"],
          "--offset-left": offsetObject["--offset-left"],
          "--mobile-offset-top": offsetObject["--mobile-offset-top"],
          "--mobile-offset-right": offsetObject["--mobile-offset-right"],
          "--mobile-offset-bottom": offsetObject["--mobile-offset-bottom"],
          "--mobile-offset-left": offsetObject["--mobile-offset-left"]
        }
      )}><!--[-->`;
      for (let index2 = 0, $$length2 = each_array_1.length; index2 < $$length2; index2++) {
        let toast2 = each_array_1[index2];
        {
          let successIcon = function($$payload2) {
            if (successIconProp) {
              $$payload2.out += "<!--[-->";
              successIconProp?.($$payload2);
              $$payload2.out += `<!---->`;
            } else if (successIconProp !== null) {
              $$payload2.out += "<!--[1-->";
              SuccessIcon($$payload2);
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }, errorIcon = function($$payload2) {
            if (errorIconProp) {
              $$payload2.out += "<!--[-->";
              errorIconProp?.($$payload2);
              $$payload2.out += `<!---->`;
            } else if (errorIconProp !== null) {
              $$payload2.out += "<!--[1-->";
              ErrorIcon($$payload2);
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }, warningIcon = function($$payload2) {
            if (warningIconProp) {
              $$payload2.out += "<!--[-->";
              warningIconProp?.($$payload2);
              $$payload2.out += `<!---->`;
            } else if (warningIconProp !== null) {
              $$payload2.out += "<!--[1-->";
              WarningIcon($$payload2);
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }, infoIcon = function($$payload2) {
            if (infoIconProp) {
              $$payload2.out += "<!--[-->";
              infoIconProp?.($$payload2);
              $$payload2.out += `<!---->`;
            } else if (infoIconProp !== null) {
              $$payload2.out += "<!--[1-->";
              InfoIcon($$payload2);
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }, closeIcon = function($$payload2) {
            if (closeIconProp) {
              $$payload2.out += "<!--[-->";
              closeIconProp?.($$payload2);
              $$payload2.out += `<!---->`;
            } else if (closeIconProp !== null) {
              $$payload2.out += "<!--[1-->";
              CloseIcon($$payload2);
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          };
          Toast($$payload, {
            index: index2,
            toast: toast2,
            defaultRichColors: richColors,
            duration: toastOptions?.duration ?? duration,
            class: toastOptions?.class ?? "",
            descriptionClass: toastOptions?.descriptionClass || "",
            invert,
            visibleToasts,
            closeButton,
            interacting,
            position: position2,
            style: toastOptions?.style ?? "",
            classes: toastOptions.classes || {},
            unstyled: toastOptions.unstyled ?? false,
            cancelButtonStyle: toastOptions?.cancelButtonStyle ?? "",
            actionButtonStyle: toastOptions?.actionButtonStyle ?? "",
            closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? closeButtonAriaLabel,
            expandByDefault: expand,
            expanded,
            loadingIcon: loadingIconProp,
            successIcon,
            errorIcon,
            warningIcon,
            infoIcon,
            closeIcon,
            $$slots: {
              successIcon: true,
              errorIcon: true,
              warningIcon: true,
              infoIcon: true,
              closeIcon: true
            }
          });
        }
      }
      $$payload.out += `<!--]--></ol>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function RFIDScanModal($$payload, $$props) {
  push();
  const {
    userID,
    animalData,
    rfidTag,
    scanData,
    onClose
  } = $$props;
  let editing = false;
  let newNote = false;
  let newNoteData = "";
  let newNoteType = "General";
  let saving = false;
  let localAnimalData = animalData;
  let localRfidTag = rfidTag;
  let hasLocalChanges = false;
  let localDialogOpen = false;
  let animals = [];
  let loadingAnimals = false;
  let selectedAnimalId = null;
  let assigning = false;
  let assignError = null;
  let assignSuccess = false;
  let popoverOpen = false;
  const formatDateTime = (v) => v ? new Date(v).toLocaleString() : "N/A";
  const formatDate = (v) => v ? new Date(v).toLocaleDateString() : "N/A";
  const formatWeight = (w) => w ? `${w} kg` : "N/A";
  const adoptionStatusVariant = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("adopted")) return "secondary";
    if (s.includes("pending")) return "outline";
    if (s.includes("medical")) return "destructive";
    return "default";
  };
  const noteTypes = [
    { value: "General", label: "General" },
    { value: "Behavioral", label: "Behavioral" },
    { value: "Medical", label: "Medical" },
    { value: "Feeding", label: "Feeding" },
    { value: "Exercise", label: "Exercise" },
    { value: "Grooming", label: "Grooming" },
    { value: "Training", label: "Training" }
  ];
  let value = "";
  const triggerContent = noteTypes.find((f) => f.value === value)?.label ?? "Select a note type";
  async function createNewNote(noteData, noteType) {
    try {
      const { error } = await supabase.from("animal_note").insert([
        {
          animal_id: localAnimalData.id,
          user_id: userID,
          note_content: noteData,
          note_type: noteType
        }
      ]);
      const { data: dbNoteData, error: fetchError } = await supabase.from("animal_note").select("id").eq("animal_id", localAnimalData.id).eq("user_id", userID).eq("note_content", noteData).eq("note_type", noteType).single();
      console.log("Fetched note data:", dbNoteData[0].id);
      if (dbNoteData && dbNoteData[0].id && scanData && scanData.id) {
        const noteId = dbNoteData[0].id;
        const { error: updateError } = await supabase.from("rfid_log").update({ animal_note: noteId }).eq("id", scanData.id);
        if (updateError) {
          console.error("Error linking note to RFID log:", updateError);
        } else {
          console.log("Successfully linked note to RFID log");
        }
      }
      toast.success(`Note added for ${localAnimalData.name}`);
      newNoteData = "";
      newNoteType = "General";
      onClose();
    } catch (error) {
      console.log("There was an error while creating the note:", error);
      toast.error("Failed to create note: " + (error?.message || "Unknown error"));
    }
  }
  async function loadAnimalsIfNeeded() {
    if (animals.length || loadingAnimals) return;
    loadingAnimals = true;
    try {
      const { data, error } = await supabase.from("animal").select("*");
      console.log("Fetched animals:", data);
      if (data) {
        animals = data;
      } else {
        console.warn("Animals fetch failed:", error);
      }
    } catch (e) {
      console.warn("Failed to fetch animals list for RFID assignment", e);
    } finally {
      loadingAnimals = false;
    }
  }
  async function assignRFID() {
    assignError = null;
    assignSuccess = false;
    if (!selectedAnimalId || !localRfidTag) {
      assignError = "Select an animal first.";
      return;
    }
    assigning = true;
    try {
      const { error } = await supabase.from("animal").update({ rfid_tag: localRfidTag }).eq("id", selectedAnimalId);
      if (error) {
        assignError = error.message || "Failed to assign tag";
      } else {
        assignSuccess = true;
        const selectedAnimal = animals.find((a) => a.id === selectedAnimalId);
        if (selectedAnimal) {
          localAnimalData = { ...selectedAnimal, rfid_tag: localRfidTag };
          toast.success(`RFID tag assigned to ${selectedAnimal.name}`);
          localRfidTag = null;
          hasLocalChanges = true;
        } else {
          assignError = "Selected animal not found in local data.";
        }
      }
    } catch (err) {
      assignError = err?.message || "Unexpected error";
    } finally {
      assigning = false;
      if (assignSuccess) {
        popoverOpen = false;
      }
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$2($$payload2, {
      onOpenChange: (open) => {
        if (!open) {
          onClose();
        }
      },
      get open() {
        return localDialogOpen;
      },
      set open($$value) {
        localDialogOpen = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Dialog_content$1($$payload3, {
          class: "max-w-lg w-full rounded-xl border bg-white dark:bg-neutral-900 shadow-lg overflow-hidden",
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_header($$payload4, {
              class: "px-6 pt-5 pb-4",
              children: ($$payload5) => {
                $$payload5.out += `<div class="flex items-start gap-3"><div class="shrink-0 p-2 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8a8 8 0 0 1 8-8m0 16a8 8 0 0 0 8-8M9 8a3 3 0 1 1 6 0 8 8 0 0 1-8 8"></path></svg></div> <div class="flex-1 space-y-1"><!---->`;
                Dialog_title$1($$payload5, {
                  class: "text-base font-semibold",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->RFID Scan Detected`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Dialog_description$1($$payload5, {
                  class: "text-sm text-neutral-500 dark:text-neutral-400 leading-snug",
                  children: ($$payload6) => {
                    if (localAnimalData) {
                      $$payload6.out += "<!--[-->";
                      $$payload6.out += `Animal scan detected for <span class="font-medium text-neutral-900 dark:text-neutral-100">${escape_html(localAnimalData.name)}</span>`;
                    } else {
                      $$payload6.out += "<!--[!-->";
                      $$payload6.out += `A new RFID scan has been detected.`;
                    }
                    $$payload6.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> `;
                if (localAnimalData) {
                  $$payload5.out += "<!--[-->";
                  Button($$payload5, {
                    variant: "ghost",
                    size: "sm",
                    class: "mt-1",
                    onclick: () => editing = !editing,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(editing ? "Cancel" : "Edit")}`;
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Separator($$payload4, {});
            $$payload4.out += `<!----> `;
            Scroll_area($$payload4, {
              class: "max-h-[60vh]",
              children: ($$payload5) => {
                $$payload5.out += `<div class="px-6 py-5 space-y-8">`;
                if (scanData) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<section class="space-y-3"><h3 class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><span class="h-3 w-0.5 rounded bg-indigo-500"></span> Scan Details</h3> <ul class="space-y-1 text-sm"><li class="flex justify-between gap-4 rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-800/60"><span class="text-neutral-600 dark:text-neutral-300">Scan Time</span> <span class="font-mono text-neutral-900 dark:text-neutral-100">${escape_html(formatDateTime(scanData.scan_time))}</span></li> <li class="flex justify-between gap-4 rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-800/60"><span class="text-neutral-600 dark:text-neutral-300">User Scan</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(scanData.user_id ? "Yes" : "No")}</span></li></ul></section>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> `;
                if (localAnimalData && !editing) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<section class="space-y-3"><h3 class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><span class="h-3 w-0.5 rounded bg-indigo-500"></span> Animal Details</h3> <div class="grid gap-2"><div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Name</span> <span class="font-medium text-neutral-900 dark:text-neutral-100">${escape_html(localAnimalData.name)}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Species</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(localAnimalData.species)}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Breed</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(localAnimalData.breed || "N/A")}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Fur Colour</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(localAnimalData.fur_colour || "N/A")}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Weight</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(formatWeight(localAnimalData.weight_kg))}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Date of Birth</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(formatDate(localAnimalData.date_of_birth))}</span></div> <div class="flex justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Arrival Date</span> <span class="text-neutral-900 dark:text-neutral-100">${escape_html(formatDate(localAnimalData.arrival_date))}</span></div> <div class="flex items-center justify-between text-sm px-2 py-1"><span class="text-neutral-500 dark:text-neutral-400">Status</span> `;
                  Badge($$payload5, {
                    variant: adoptionStatusVariant(localAnimalData.adoption_status),
                    class: "capitalize",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(localAnimalData.adoption_status || "Unknown")}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----></div> `;
                  if (localAnimalData.special_needs) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<div class="mt-2 rounded-md border bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/30 p-3"><p class="text-xs font-medium text-rose-700 dark:text-rose-300 mb-1">Special Needs</p> <p class="text-xs text-rose-800 dark:text-rose-200 leading-snug">${escape_html(localAnimalData.special_needs)}</p></div>`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--> `;
                  if (localAnimalData.description) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<div class="mt-2 rounded-md border dark:border-gray-500/30 p-3"><p class="text-xs font-medium text-neutral-900 dark:text-neutral-100 mb-1">Description</p> <p class="text-xs text-neutral-800 dark:text-neutral-200 leading-snug">${escape_html(localAnimalData.description)}</p></div>`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--></div></section>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> `;
                if (localAnimalData && editing) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<form class="space-y-5"><h3 class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><span class="h-3 w-0.5 rounded bg-indigo-500"></span> Edit Animal</h3> <div class="grid gap-4"><div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "name",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Name`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "name",
                    name: "name",
                    required: true,
                    value: localAnimalData.name
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "species",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Species`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "species",
                    name: "species",
                    required: true,
                    value: localAnimalData.species
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "breed",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Breed`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "breed",
                    name: "breed",
                    value: localAnimalData.breed || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "fur_colour",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Fur Colour`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "fur_colour",
                    name: "fur_colour",
                    value: localAnimalData.fur_colour || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "weight_kg",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Weight (kg)`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "weight_kg",
                    name: "weight_kg",
                    type: "number",
                    step: "0.01",
                    value: localAnimalData.weight_kg || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "date_of_birth",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Date of Birth`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "date_of_birth",
                    name: "date_of_birth",
                    type: "date",
                    value: localAnimalData.date_of_birth || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "arrival_date",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Arrival Date`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "arrival_date",
                    name: "arrival_date",
                    type: "date",
                    value: localAnimalData.arrival_date || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "adoption_status",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Adoption Status`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Root$3($$payload5, {
                    type: "single",
                    name: "adoptionStatus",
                    get value() {
                      return localAnimalData.adoption_status;
                    },
                    set value($$value) {
                      localAnimalData.adoption_status = $$value;
                      $$settled = false;
                    },
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Select_trigger($$payload6, {
                        class: "w-[180px]",
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(localAnimalData.adoption_status || "Select adoption status")}`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Select_content($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Select_group($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->`;
                              Select_label($$payload8, {
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Adoption Status`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Available",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Available`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Pending",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Pending`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Adopted",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Adopted`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Hold",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Hold`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Medical Hold",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Medical Hold`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Select_item($$payload8, {
                                value: "Not Available",
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Not Available`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <input type="hidden" name="adoption_status"${attr("value", localAnimalData.adoption_status || "")}/></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "special_needs",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Special Needs`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Input($$payload5, {
                    id: "special_needs",
                    name: "special_needs",
                    value: localAnimalData.special_needs || ""
                  });
                  $$payload5.out += `<!----></div> <div class="grid gap-1.5">`;
                  Label($$payload5, {
                    for: "description",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Description`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Textarea($$payload5, {
                    id: "description",
                    name: "description",
                    value: localAnimalData.description || ""
                  });
                  $$payload5.out += `<!----></div> `;
                  {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--> <div class="flex justify-end gap-2 pt-2">`;
                  Button($$payload5, {
                    type: "button",
                    variant: "ghost",
                    onclick: () => editing = false,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Cancel`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Button($$payload5, {
                    type: "submit",
                    disabled: saving,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html("Save")}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----></div></div></form>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> `;
                if (!localAnimalData && localRfidTag) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<section class="space-y-4"><h3 class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><span class="h-3 w-0.5 rounded bg-indigo-500"></span> Assign RFID Tag</h3> <p class="text-sm text-neutral-600 dark:text-neutral-400">Tag <code class="font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">${escape_html(localRfidTag)}</code> is unassigned. Select an animal to associate it.</p> <div class="flex flex-col gap-3"><div class="flex items-center gap-2"><!---->`;
                  Root$4($$payload5, {
                    get open() {
                      return popoverOpen;
                    },
                    set open($$value) {
                      popoverOpen = $$value;
                      $$settled = false;
                    },
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Popover_trigger($$payload6, {
                        children: ($$payload7) => {
                          Button($$payload7, {
                            type: "button",
                            variant: "outline",
                            role: "combobox",
                            "aria-expanded": popoverOpen,
                            class: "w-72 justify-between",
                            onclick: loadAnimalsIfNeeded,
                            children: ($$payload8) => {
                              if (selectedAnimalId) {
                                $$payload8.out += "<!--[-->";
                                $$payload8.out += `<!---->`;
                                {
                                  $$payload8.out += `${escape_html(animals.find((a) => a.id === selectedAnimalId)?.name || "Select animal")}`;
                                }
                                $$payload8.out += `<!---->`;
                              } else if (loadingAnimals) {
                                $$payload8.out += "<!--[1-->";
                                $$payload8.out += `Loading animals...`;
                              } else {
                                $$payload8.out += "<!--[!-->";
                                $$payload8.out += `Select animal`;
                              }
                              $$payload8.out += `<!--]--><svg class="ml-2 h-4 w-4 opacity-60" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Popover_content($$payload6, {
                        class: "w-72 p-0",
                        align: "start",
                        children: ($$payload7) => {
                          Command($$payload7, {
                            children: ($$payload8) => {
                              Command_input($$payload8, { placeholder: "Search animals..." });
                              $$payload8.out += `<!----> `;
                              Command_list($$payload8, {
                                children: ($$payload9) => {
                                  const each_array = ensure_array_like(animals);
                                  Command_empty($$payload9, {
                                    children: ($$payload10) => {
                                      $$payload10.out += `<!---->No animals found.`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload9.out += `<!----> <!--[-->`;
                                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                                    let a = each_array[$$index];
                                    Command_item($$payload9, {
                                      value: a.name,
                                      onSelect: () => {
                                        selectedAnimalId = a.id;
                                        popoverOpen = false;
                                      },
                                      children: ($$payload10) => {
                                        $$payload10.out += `<span class="truncate">${escape_html(a.name)} (${escape_html(a.species)})</span> `;
                                        if (selectedAnimalId === a.id) {
                                          $$payload10.out += "<!--[-->";
                                          $$payload10.out += `<svg class="ml-auto h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
                                        } else {
                                          $$payload10.out += "<!--[!-->";
                                        }
                                        $$payload10.out += `<!--]-->`;
                                      },
                                      $$slots: { default: true }
                                    });
                                  }
                                  $$payload9.out += `<!--]-->`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  if (selectedAnimalId) {
                    $$payload5.out += "<!--[-->";
                    Badge($$payload5, {
                      variant: "outline",
                      class: "max-w-[140px] truncate",
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->${escape_html(animals.find((a) => a.uuid === selectedAnimalId)?.species)}`;
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--></div> <div class="flex gap-2">`;
                  Button($$payload5, {
                    onclick: assignRFID,
                    disabled: !selectedAnimalId || assigning,
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(assigning ? "Assigning..." : "Assign Tag")}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  if (assignSuccess) {
                    $$payload5.out += "<!--[-->";
                    Badge($$payload5, {
                      variant: "secondary",
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->Assigned`;
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--></div> `;
                  if (assignError) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<p class="text-xs text-rose-600 dark:text-rose-400">${escape_html(assignError)}</p>`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--></div></section>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> `;
                if (animalData && newNote) {
                  $$payload5.out += "<!--[-->";
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Separator($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Dialog_footer($$payload4, {
              class: "px-6 py-4 flex justify-end gap-2",
              children: ($$payload5) => {
                if (localAnimalData) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<!---->`;
                  Root$2($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Dialog_trigger($$payload6, {
                        asChild: true,
                        children: ($$payload7) => {
                          Button($$payload7, {
                            variant: "outline",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Add Note`;
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Dialog_content$1($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Dialog_title$1($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Add a note for this animal`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> <!---->`;
                          Dialog_description$1($$payload7, {
                            children: ($$payload8) => {
                              Textarea($$payload8, {
                                id: "note",
                                class: "mb-3",
                                get value() {
                                  return newNoteData;
                                },
                                set value($$value) {
                                  newNoteData = $$value;
                                  $$settled = false;
                                }
                              });
                              $$payload8.out += `<!----> <!---->`;
                              Root$3($$payload8, {
                                type: "single",
                                name: "noteType",
                                get value() {
                                  return newNoteType;
                                },
                                set value($$value) {
                                  newNoteType = $$value;
                                  $$settled = false;
                                },
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->`;
                                  Select_trigger($$payload9, {
                                    class: "w-[180px]",
                                    children: ($$payload10) => {
                                      $$payload10.out += `<!---->${escape_html(triggerContent)}`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload9.out += `<!----> <!---->`;
                                  Select_content($$payload9, {
                                    children: ($$payload10) => {
                                      $$payload10.out += `<!---->`;
                                      Select_group($$payload10, {
                                        children: ($$payload11) => {
                                          const each_array_1 = ensure_array_like(noteTypes);
                                          $$payload11.out += `<!---->`;
                                          Select_label($$payload11, {
                                            children: ($$payload12) => {
                                              $$payload12.out += `<!---->Note Types`;
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$payload11.out += `<!----> <!--[-->`;
                                          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                                            let noteType = each_array_1[$$index_1];
                                            $$payload11.out += `<!---->`;
                                            Select_item($$payload11, {
                                              value: noteType.value,
                                              label: noteType.label,
                                              children: ($$payload12) => {
                                                $$payload12.out += `<!---->${escape_html(noteType.label)}`;
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$payload11.out += `<!---->`;
                                          }
                                          $$payload11.out += `<!--]-->`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload10.out += `<!---->`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload9.out += `<!---->`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> <!---->`;
                          Dialog_footer($$payload7, {
                            children: ($$payload8) => {
                              Button($$payload8, {
                                variant: "outline",
                                onclick: () => {
                                  createNewNote(newNoteData, newNoteType);
                                },
                                children: ($$payload9) => {
                                  $$payload9.out += `<!---->Create note`;
                                },
                                $$slots: { default: true }
                              });
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> `;
                Button($$payload5, {
                  variant: "outline",
                  onclick: onClose,
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Close`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Sonner_1($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  Toaster($$payload, spread_props([
    {
      theme: derivedMode.current,
      class: "toaster group",
      style: "--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
    },
    restProps
  ]));
  pop();
}
function _layout($$payload, $$props) {
  push();
  let isAuthRoute = page$1.url.pathname.startsWith("/auth");
  let currentUserId = page$1.data.user?.id || null;
  let currentScanData = null;
  let animalDetails = null;
  let rfidTag = null;
  function closeModal() {
    setTimeout(
      () => {
        currentScanData = null;
        animalDetails = null;
        rfidTag = null;
      },
      150
    );
  }
  let { data, children } = $$props;
  let { session, supabase: supabase2 } = data;
  let breadcrumbs = (() => {
    const pathname = page$1.url.pathname;
    const crumbs = [
      {
        title: "Dashboard",
        href: "/",
        isCurrentPage: pathname === "/"
      }
    ];
    if (pathname === "/animals") {
      crumbs.push({
        title: "Animals",
        href: "/animals",
        isCurrentPage: true
      });
    } else if (pathname === "/scan-logs") {
      crumbs.push({
        title: "Scan logs",
        href: "/scan-logs",
        isCurrentPage: true
      });
    } else if (pathname === "/private") {
      crumbs.push({
        title: "User Profile",
        href: "/private",
        isCurrentPage: true
      });
    }
    return crumbs;
  })();
  onDestroy(() => {
  });
  Mode_watcher($$payload, {});
  $$payload.out += `<!----> `;
  if (isAuthRoute) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex flex-col min-h-screen"><!---->`;
    Sidebar_provider($$payload, {
      children: ($$payload2) => {
        App_sidebar($$payload2);
        $$payload2.out += `<!----> <!---->`;
        Sidebar_inset($$payload2, {
          class: "flex flex-col flex-1",
          children: ($$payload3) => {
            $$payload3.out += `<header class="h-12 shrink-0 items-center gap-2 px-4 hidden md:flex"><!---->`;
            Sidebar_trigger($$payload3, { class: "-ml-1" });
            $$payload3.out += `<!----> <!---->`;
            Breadcrumb($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Breadcrumb_list($$payload4, {
                  children: ($$payload5) => {
                    const each_array = ensure_array_like(breadcrumbs);
                    $$payload5.out += `<!--[-->`;
                    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
                      let crumb = each_array[index];
                      $$payload5.out += `<!---->`;
                      Breadcrumb_item($$payload5, {
                        children: ($$payload6) => {
                          if (crumb.isCurrentPage) {
                            $$payload6.out += "<!--[-->";
                            $$payload6.out += `<!---->`;
                            Breadcrumb_page($$payload6, {
                              class: "font-semibold",
                              children: ($$payload7) => {
                                $$payload7.out += `<!---->${escape_html(crumb.title)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload6.out += `<!---->`;
                          } else {
                            $$payload6.out += "<!--[!-->";
                            $$payload6.out += `<!---->`;
                            Breadcrumb_link($$payload6, {
                              href: crumb.href,
                              class: "font-medium",
                              children: ($$payload7) => {
                                $$payload7.out += `<!---->${escape_html(crumb.title)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload6.out += `<!---->`;
                          }
                          $$payload6.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> `;
                      if (index < breadcrumbs.length - 1) {
                        $$payload5.out += "<!--[-->";
                        $$payload5.out += `<!---->`;
                        Breadcrumb_separator($$payload5, {});
                        $$payload5.out += `<!---->`;
                      } else {
                        $$payload5.out += "<!--[!-->";
                      }
                      $$payload5.out += `<!--]-->`;
                    }
                    $$payload5.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></header> <div class="flex flex-1 flex-col gap-4 p-4 pt-0 pb-20 md:pb-4">`;
            children?.($$payload3);
            $$payload3.out += `<!----></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <div class="fixed bottom-0 left-0 right-0 md:hidden z-50">`;
    Mobile_bottom_tabs($$payload);
    $$payload.out += `<!----></div></div> `;
    RFIDScanModal($$payload, {
      userID: currentUserId,
      animalData: animalDetails,
      rfidTag,
      scanData: currentScanData,
      onClose: closeModal
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--> `;
  Sonner_1($$payload, {});
  $$payload.out += `<!---->`;
  pop();
}
export {
  _layout as default
};
