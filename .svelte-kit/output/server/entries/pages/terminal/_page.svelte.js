import { s as escape_html } from "../../../chunks/server2.js";
import "../../../chunks/auth-client.js";
import "../../../chunks/navigation.js";
// src/routes/terminal/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<main class="terminal svelte-1dhdpeh"><h1 class="svelte-1dhdpeh">AFTERLIGHT SYSTEMS</h1> <p>Authentication successful.</p> <h2 class="svelte-1dhdpeh">Welcome, ${escape_html(data.userNumber)}.</h2> <p>Email: ${escape_html(data.email)}</p> <p>Session status: ACTIVE</p> <button>Sign Out</button></main>`);
	});
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map