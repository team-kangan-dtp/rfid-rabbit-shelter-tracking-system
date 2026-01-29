import "clsx";
import { v as derived, a as push, w as props_id, d as spread_attributes, h as bind_props, p as pop, c as spread_props, _ as attr_class, s as stringify, e as escape_html, j as ensure_array_like, x as copy_payload, y as assign_payload, f as clsx, b as attr } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { T as Textarea, U as User, t as toggleMode, L as Log_out } from "../../../chunks/textarea.js";
import "style-to-object";
import { C as Checkbox, P as Page_header } from "../../../chunks/page-header.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import { c as cn, B as Button } from "../../../chunks/button.js";
import { a as attachRef, c as createBitsAttrs, b as createId, d as box, m as mergeProps, I as Input } from "../../../chunks/create-id.js";
import { C as Context, e as DOMContext } from "../../../chunks/scroll-lock.js";
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_description, d as Dialog_footer } from "../../../chunks/check.js";
import { L as Label } from "../../../chunks/label.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { C as Calendar } from "../../../chunks/calendar.js";
const avatarAttrs = createBitsAttrs({
  component: "avatar",
  parts: ["root", "image", "fallback"]
});
const AvatarRootContext = new Context("Avatar.Root");
class AvatarRootState {
  static create(opts) {
    return AvatarRootContext.set(new AvatarRootState(opts));
  }
  opts;
  domContext;
  attachment;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(this.opts.ref);
    this.loadImage = this.loadImage.bind(this);
    this.attachment = attachRef(this.opts.ref);
  }
  loadImage(src, crossorigin, referrerPolicy) {
    if (this.opts.loadingStatus.current === "loaded") return;
    let imageTimerId;
    const image = new Image();
    image.src = src;
    if (crossorigin !== void 0) image.crossOrigin = crossorigin;
    if (referrerPolicy) image.referrerPolicy = referrerPolicy;
    this.opts.loadingStatus.current = "loading";
    image.onload = () => {
      imageTimerId = this.domContext.setTimeout(
        () => {
          this.opts.loadingStatus.current = "loaded";
        },
        this.opts.delayMs.current
      );
    };
    image.onerror = () => {
      this.opts.loadingStatus.current = "error";
    };
    return () => {
      if (!imageTimerId) return;
      this.domContext.clearTimeout(imageTimerId);
    };
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [avatarAttrs.root]: "",
    "data-status": this.opts.loadingStatus.current,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class AvatarFallbackState {
  static create(opts) {
    return new AvatarFallbackState(opts, AvatarRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }
  #style = derived(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : void 0);
  get style() {
    return this.#style();
  }
  set style($$value) {
    return this.#style($$value);
  }
  #props = derived(() => ({
    style: this.style,
    "data-status": this.root.opts.loadingStatus.current,
    [avatarAttrs.fallback]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Avatar$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    delayMs = 0,
    loadingStatus = "loading",
    onLoadingStatusChange,
    child,
    children,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = AvatarRootState.create({
    delayMs: box.with(() => delayMs),
    loadingStatus: box.with(() => loadingStatus, (v) => {
      if (loadingStatus !== v) {
        loadingStatus = v;
        onLoadingStatusChange?.(v);
      }
    }),
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
  bind_props($$props, { loadingStatus, ref });
  pop();
}
function Avatar_fallback$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const fallbackState = AvatarFallbackState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, fallbackState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Sun_moon($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.9 4.9 1.4 1.4" }],
    ["path", { "d": "m17.7 17.7 1.4 1.4" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.3 17.7-1.4 1.4" }],
    ["path", { "d": "m19.1 4.9-1.4 1.4" }]
  ];
  Icon($$payload, spread_props([
    { name: "sun-moon" },
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
function Phone($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "phone" },
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
function Map_pin($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    [
      "circle",
      { "cx": "12", "cy": "10", "r": "3" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "map-pin" },
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
function Shield($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "shield" },
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
function Credit_card($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "5",
        "rx": "2"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "22",
        "y1": "10",
        "y2": "10"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "credit-card" },
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
function Clock($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  Icon($$payload, spread_props([
    { name: "clock" },
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
function Square_pen($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "square-pen" },
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
function File_text($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { "d": "M10 9H8" }],
    ["path", { "d": "M16 13H8" }],
    ["path", { "d": "M16 17H8" }]
  ];
  Icon($$payload, spread_props([
    { name: "file-text" },
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
function Profile_field($$payload, $$props) {
  let {
    icon: Icon2,
    label,
    value,
    fallback = "Not provided",
    alignTop = false
  } = $$props;
  $$payload.out += `<div${attr_class(`flex ${stringify(alignTop ? "items-start" : "items-center")} gap-3`)}><!---->`;
  Icon2($$payload, {
    class: `h-4 w-4 text-muted-foreground ${stringify(alignTop ? "mt-0.5" : "")}`
  });
  $$payload.out += `<!----> <div><p class="text-sm font-medium">${escape_html(label)}</p> <p class="text-sm text-muted-foreground">${escape_html(value || fallback)}</p></div></div>`;
}
function Profile_info_card($$payload, $$props) {
  let {
    title,
    description,
    fields,
    content,
    contentIcon: ContentIcon,
    contentFallback = "No information available",
    contentAlignTop = false
  } = $$props;
  $$payload.out += `<!---->`;
  Card($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Card_header($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(title)}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(description)}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Card_content($$payload2, {
        class: fields ? "space-y-4" : "",
        children: ($$payload3) => {
          if (fields) {
            $$payload3.out += "<!--[-->";
            const each_array = ensure_array_like(fields);
            $$payload3.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let field = each_array[$$index];
              Profile_field($$payload3, {
                icon: field.icon,
                label: field.label,
                value: field.value,
                fallback: field.fallback
              });
            }
            $$payload3.out += `<!--]-->`;
          } else if (ContentIcon) {
            $$payload3.out += "<!--[1-->";
            $$payload3.out += `<div${attr_class(`flex ${stringify(contentAlignTop ? "items-start" : "items-center")} gap-3`)}><!---->`;
            ContentIcon($$payload3, {
              class: `h-4 w-4 text-muted-foreground ${stringify(contentAlignTop ? "mt-0.5" : "")}`
            });
            $$payload3.out += `<!----> <div><p class="text-sm text-muted-foreground">${escape_html(content || contentFallback)}</p></div></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<p class="text-sm text-muted-foreground">${escape_html(content || contentFallback)}</p>`;
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
function Avatar($$payload, $$props) {
  push();
  let {
    ref = null,
    loadingStatus = "loading",
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Avatar$1($$payload2, spread_props([
      {
        "data-slot": "avatar",
        class: cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)
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
        get loadingStatus() {
          return loadingStatus;
        },
        set loadingStatus($$value) {
          loadingStatus = $$value;
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
  bind_props($$props, { ref, loadingStatus });
  pop();
}
function Avatar_fallback($$payload, $$props) {
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
    Avatar_fallback$1($$payload2, spread_props([
      {
        "data-slot": "avatar-fallback",
        class: cn("bg-muted flex size-full items-center justify-center rounded-full", className)
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
function Profile_hero_card($$payload, $$props) {
  push();
  let {
    firstName,
    lastName,
    email,
    title,
    statusBadges = [],
    actionButtons = []
  } = $$props;
  const getUserInitials = (firstName2, lastName2, email2) => {
    if (firstName2 && lastName2) {
      return `${firstName2.charAt(0)}${lastName2.charAt(0)}`.toUpperCase();
    }
    if (firstName2) {
      return firstName2.charAt(0).toUpperCase();
    }
    return email2.charAt(0).toUpperCase();
  };
  const getDisplayName = () => {
    if (firstName || lastName) {
      return `${firstName || ""} ${lastName || ""}`.trim();
    }
    return title || "User Profile";
  };
  const getBadgeClasses = (variant, customClasses) => {
    if (customClasses) return customClasses;
    switch (variant) {
      case "admin":
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-destructive/10 text-destructive text-sm font-medium";
      case "volunteer":
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium";
      case "custom":
      default:
        return "inline-flex items-center gap-1 px-3 py-1 rounded-md bg-muted text-muted-foreground text-sm font-medium";
    }
  };
  $$payload.out += `<!---->`;
  Card($$payload, {
    class: "mb-6",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Card_header($$payload2, {
        children: ($$payload3) => {
          const each_array = ensure_array_like(statusBadges);
          $$payload3.out += `<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4"><div class="flex items-start gap-4"><!---->`;
          Avatar($$payload3, {
            class: "h-20 w-20",
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Avatar_fallback($$payload4, {
                class: "text-3xl font-semibold bg-primary text-primary-foreground",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(getUserInitials(firstName, lastName, email))}`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <div class="flex-1 space-y-3 mt-6"><div class="flex items-center gap-3 flex-wrap"><!---->`;
          Card_title($$payload3, {
            class: "text-3xl",
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(getDisplayName())}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let badge = each_array[$$index];
            const IconComponent = badge.icon;
            $$payload3.out += `<span${attr_class(clsx(getBadgeClasses(badge.variant, badge.customClasses)))}><!---->`;
            IconComponent($$payload3, { class: "h-4 w-4" });
            $$payload3.out += `<!----> ${escape_html(badge.label)}</span>`;
          }
          $$payload3.out += `<!--]--></div></div></div> `;
          if (actionButtons.length > 0) {
            $$payload3.out += "<!--[-->";
            const each_array_1 = ensure_array_like(actionButtons);
            $$payload3.out += `<div class="flex flex-col md:flex-row gap-2 min-w-fit"><!--[-->`;
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let button = each_array_1[$$index_1];
              const IconComponent = button.icon;
              Button($$payload3, {
                variant: button.variant || "outline",
                size: button.size || "sm",
                onclick: button.onclick,
                children: ($$payload4) => {
                  $$payload4.out += `<!---->`;
                  IconComponent($$payload4, { class: "h-4 w-4 mr-2" });
                  $$payload4.out += `<!----> ${escape_html(button.label)}`;
                },
                $$slots: { default: true }
              });
            }
            $$payload3.out += `<!--]--></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function Profile_edit_modal($$payload, $$props) {
  push();
  let {
    id,
    email,
    firstName,
    lastName,
    phone,
    dateOfBirth,
    addressLine,
    city,
    state,
    postalCode,
    volunteerStartDate,
    isActiveVolunteer,
    rfidTag,
    notes,
    open = void 0
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Dialog_content($$payload3, {
          class: "max-w-2xl max-h-[90vh] flex flex-col",
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_header($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dialog_title($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Edit Profile`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Dialog_description($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Profile editing form will go here.`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <form id="edit-profile-form" method="POST" action="?/update" class="flex-1 space-y-4 overflow-y-auto"><input type="hidden" name="id"${attr("value", id)}/> <div class="space-y-2">`;
            Label($$payload4, {
              for: "first-name",
              children: ($$payload5) => {
                $$payload5.out += `<!---->First Name *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "first-name",
              type: "text",
              name: "first_name",
              required: true,
              get value() {
                return firstName;
              },
              set value($$value) {
                firstName = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "last-name",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Last Name *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "last-name",
              type: "text",
              name: "last_name",
              required: true,
              get value() {
                return lastName;
              },
              set value($$value) {
                lastName = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "phone",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Phone *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "phone",
              type: "tel",
              name: "phone",
              required: true,
              get value() {
                return phone;
              },
              set value($$value) {
                phone = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "date-of-birth",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Date of Birth *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "date-of-birth",
              type: "date",
              name: "date_of_birth",
              required: true,
              get value() {
                return dateOfBirth;
              },
              set value($$value) {
                dateOfBirth = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "address-line",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Address Line *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "address-line",
              type: "text",
              name: "address_line",
              required: true,
              get value() {
                return addressLine;
              },
              set value($$value) {
                addressLine = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "city",
              children: ($$payload5) => {
                $$payload5.out += `<!---->City *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "city",
              type: "text",
              name: "city",
              required: true,
              get value() {
                return city;
              },
              set value($$value) {
                city = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "state",
              children: ($$payload5) => {
                $$payload5.out += `<!---->State *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "state",
              type: "text",
              name: "state",
              required: true,
              get value() {
                return state;
              },
              set value($$value) {
                state = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "postal-code",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Postal Code *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "postal-code",
              type: "text",
              name: "postal_code",
              required: true,
              get value() {
                return postalCode;
              },
              set value($$value) {
                postalCode = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "volunteer-start-date",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Volunteer Start Date *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "volunteer-start-date",
              type: "date",
              name: "volunteer_start_date",
              required: true,
              get value() {
                return volunteerStartDate;
              },
              set value($$value) {
                volunteerStartDate = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "is-active-volunteer",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Active Volunteer Status`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Checkbox($$payload4, {
              id: "is-active-volunteer",
              name: "is_active_volunteer",
              get checked() {
                return isActiveVolunteer;
              },
              set checked($$value) {
                isActiveVolunteer = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "rfid-tag",
              children: ($$payload5) => {
                $$payload5.out += `<!---->RFID Tag *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "rfid-tag",
              type: "text",
              name: "rfid_tag",
              required: true,
              get value() {
                return rfidTag;
              },
              set value($$value) {
                rfidTag = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "notes",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Notes`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Textarea($$payload4, {
              id: "notes",
              name: "volunteer_notes",
              get value() {
                return notes;
              },
              set value($$value) {
                notes = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div></form> <!---->`;
            Dialog_footer($$payload4, {
              children: ($$payload5) => {
                Button($$payload5, {
                  type: "submit",
                  form: "edit-profile-form",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Update Profile`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Button($$payload5, {
                  onclick: () => open = false,
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
  bind_props($$props, { open });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let { supabase, currentUser } = data;
  let profileEditModalOpen = false;
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      goto();
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="px-6 pt-6 pb-6">`;
    Page_header($$payload2, {
      title: "User Profile",
      description: "Manage your profile information and settings"
    });
    $$payload2.out += `<!----> `;
    if (currentUser) {
      $$payload2.out += "<!--[-->";
      Profile_hero_card($$payload2, {
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        statusBadges: [
          currentUser.is_admin && {
            variant: "admin",
            label: "Administrator",
            icon: Shield
          },
          currentUser.is_active_volunteer && {
            variant: "volunteer",
            label: "Active Volunteer",
            icon: User
          }
        ].filter(Boolean),
        actionButtons: [
          {
            variant: "outline",
            label: "Edit Profile",
            icon: Square_pen,
            onclick: () => {
              profileEditModalOpen = true;
            }
          },
          {
            variant: "outline",
            label: "Toggle Mode",
            icon: Sun_moon,
            onclick: toggleMode
          },
          {
            variant: "outline",
            label: "Logout",
            icon: Log_out,
            onclick: logout
          }
        ]
      });
      $$payload2.out += `<!----> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">`;
      Profile_info_card($$payload2, {
        title: "Personal Information",
        description: "Your personal details and contact information",
        fields: [
          {
            icon: User,
            label: "Email",
            value: currentUser.email,
            fallback: "Email not provided"
          },
          {
            icon: Phone,
            label: "Phone Number",
            value: currentUser.phone,
            fallback: "Phone number not provided"
          },
          {
            icon: Calendar,
            label: "Date of Birth",
            value: formatDate(currentUser.date_of_birth)
          },
          {
            icon: Map_pin,
            label: "Address",
            value: [
              currentUser.address_line,
              currentUser.city,
              currentUser.state,
              currentUser.postal_code
            ].filter(Boolean).join(", ") || null,
            fallback: "Address not provided"
          }
        ]
      });
      $$payload2.out += `<!----> `;
      Profile_info_card($$payload2, {
        title: "Volunteer Information",
        description: "Your volunteer details and access information",
        fields: [
          {
            icon: Clock,
            label: "Volunteer Start Date",
            value: formatDate(currentUser.volunteer_start_date),
            fallback: "Start date not recorded"
          },
          {
            icon: Credit_card,
            label: "Staff Card No (RFID)",
            value: currentUser.rfid_tag,
            fallback: "RFID not assigned"
          }
        ]
      });
      $$payload2.out += `<!----> `;
      Profile_info_card($$payload2, {
        title: "Volunteer Notes",
        description: "Information, preferences, and notes about you as a volunteer",
        fields: [
          {
            icon: File_text,
            label: "Volunteer Notes",
            value: currentUser.volunteer_notes,
            fallback: "No notes recorded"
          }
        ]
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (currentUser) {
      $$payload2.out += "<!--[-->";
      Profile_edit_modal($$payload2, {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.first_name || "",
        lastName: currentUser.last_name || "",
        phone: currentUser.phone || "",
        dateOfBirth: currentUser.date_of_birth || "",
        addressLine: currentUser.address_line || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        postalCode: currentUser.postal_code || "",
        volunteerStartDate: currentUser.volunteer_start_date || "",
        isActiveVolunteer: currentUser.is_active_volunteer || false,
        rfidTag: currentUser.rfid_tag || "",
        notes: currentUser.volunteer_notes || "",
        get open() {
          return profileEditModalOpen;
        },
        set open($$value) {
          profileEditModalOpen = $$value;
          $$settled = false;
        }
      });
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
  pop();
}
export {
  _page as default
};
