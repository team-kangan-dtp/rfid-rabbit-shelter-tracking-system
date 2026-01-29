import { e as escape_html, j as ensure_array_like, p as pop, a as push } from "../../../chunks/index2.js";
import "../../../chunks/supabaseClient.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import { p as page } from "../../../chunks/index3.js";
function _page($$payload, $$props) {
  push();
  let logEvents = [];
  let connectionStatus = "Disconnected";
  let currentUserId = page.data.user?.id || null;
  let currentUserEmail = page.data.user?.email || null;
  onDestroy(() => {
  });
  $$payload.out += `<h1>Realtime Log Test</h1> <p>Status: ${escape_html(connectionStatus)}</p> <p>Current user email: ${escape_html(currentUserEmail)}</p> <p>Current user ID: ${escape_html(currentUserId)}</p> `;
  if (logEvents.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(logEvents);
    $$payload.out += `<h2>Recent Log Events:</h2> <ul><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let event = each_array[index];
      $$payload.out += `<li><strong>Event ${escape_html(index + 1)}:</strong> <pre>${escape_html(JSON.stringify(event, null, 2))}</pre></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>No log events received yet. Try inserting data into the log table.</p>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
