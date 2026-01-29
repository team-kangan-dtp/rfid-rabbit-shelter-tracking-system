import "clsx";
import { B as Button } from "../../../../chunks/button.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { R as Rabbit } from "../../../../chunks/rabbit.js";
import { c as spread_props, p as pop, a as push } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Mail($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }
    ],
    [
      "rect",
      {
        "x": "2",
        "y": "4",
        "width": "20",
        "height": "16",
        "rx": "2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "mail" },
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
              $$payload4.out += `<!---->Check your email`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->We've sent a confirmation link to your email address`;
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
          $$payload3.out += `<div class="flex justify-center mb-6"><div class="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full">`;
          Mail($$payload3, { class: "size-8" });
          $$payload3.out += `<!----></div></div> <div class="space-y-4 mb-6"><p class="text-sm text-muted-foreground">Please check your email and click the confirmation link to activate
            your account.</p> <p class="text-sm text-muted-foreground">If you don't see the email, check your spam folder.</p></div> <a href="/auth" class="w-full">`;
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
