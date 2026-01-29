import "clsx";
import { B as Button } from "../../../../chunks/button.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { R as Rabbit } from "../../../../chunks/rabbit.js";
import { c as spread_props, p as pop, a as push } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Mail_warning($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      }
    ],
    ["path", { "d": "M20 14v4" }],
    ["path", { "d": "M20 22v.01" }]
  ];
  Icon($$payload, spread_props([
    { name: "mail-warning" },
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
function _page($$payload) {
  $$payload.out += `<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"><div class="flex w-full max-w-sm flex-col gap-6"><a class="flex items-center gap-2 self-center font-medium"><div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">`;
  Rabbit($$payload, { class: "size-4" });
  $$payload.out += `<!----></div> Shelter Sync</a> `;
  Card($$payload, {
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "text-center",
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-xl",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Sign In Error`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->An error occurred while signing in.`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "text-center",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex justify-center mb-6"><div class="bg-destructive/10 text-destructive flex size-16 items-center justify-center rounded-full">`;
          Mail_warning($$payload3, { class: "size-8" });
          $$payload3.out += `<!----></div></div> <div class="space-y-4 mb-6"><p class="text-sm text-muted-foreground">Please try again or contact support.</p></div> <a href="/auth" class="w-full">`;
          Button($$payload3, {
            class: "w-full",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Back to Sign In`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></a>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
}
export {
  _page as default
};
