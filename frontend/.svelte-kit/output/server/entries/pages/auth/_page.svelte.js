import { e as escape_html, b as attr, s as stringify, p as pop, a as push } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
import { B as Button } from "../../../chunks/button.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import "clsx";
import { L as Label } from "../../../chunks/label.js";
import { I as Input } from "../../../chunks/create-id.js";
import { R as Rabbit } from "../../../chunks/rabbit.js";
function _page($$payload, $$props) {
  push();
  let { form } = $$props;
  let isLoading = false;
  const emailId = crypto.randomUUID();
  const passwordId = crypto.randomUUID();
  $$payload.out += `<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"><div class="flex w-full max-w-sm flex-col gap-6"><a class="flex items-center gap-2 self-center font-medium"><div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">`;
  Rabbit($$payload, { class: "size-4" });
  $$payload.out += `<!----></div> Shelter Sync</a> <!---->`;
  Card($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Card_header($$payload2, {
        class: "text-center",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Card_title($$payload3, {
            class: "text-xl",
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html("Welcome back")}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html("Sign in to your account to continue")}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Card_content($$payload2, {
        children: ($$payload3) => {
          if (form?.error) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">${escape_html(form.error)}</div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <form method="POST"${attr("action", "?/login")}><div class="grid gap-6"><div class="grid gap-3">`;
          Label($$payload3, {
            for: `email-${stringify(emailId)}`,
            children: ($$payload4) => {
              $$payload4.out += `<!---->Email`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Input($$payload3, {
            id: `email-${stringify(emailId)}`,
            name: "email",
            type: "email",
            placeholder: "m@example.com",
            disabled: isLoading,
            required: true
          });
          $$payload3.out += `<!----></div> <div class="grid gap-3">`;
          Label($$payload3, {
            for: `password-${stringify(passwordId)}`,
            children: ($$payload4) => {
              $$payload4.out += `<!---->Password`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Input($$payload3, {
            id: `password-${stringify(passwordId)}`,
            name: "password",
            type: "password",
            disabled: isLoading,
            required: true
          });
          $$payload3.out += `<!----></div> `;
          Button($$payload3, {
            type: "submit",
            class: "w-full",
            disabled: isLoading,
            children: ($$payload4) => {
              {
                $$payload4.out += "<!--[!-->";
                $$payload4.out += `${escape_html("Login")}`;
              }
              $$payload4.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div></form> <div class="mt-6 text-center text-sm">${escape_html("Don't have an account?")} <button type="button" class="underline underline-offset-4 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", isLoading, true)}>${escape_html("Sign up")}</button></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}
export {
  _page as default
};
