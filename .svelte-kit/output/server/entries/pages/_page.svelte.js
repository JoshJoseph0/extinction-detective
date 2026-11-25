import { a as attr, o as escape_html } from "../../chunks/server2.js";
import { t as onDestroy } from "../../chunks/index-server.js";
// src/lib/components/startup/BootSequence.svelte
function BootSequence($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onComplete } = $$props;
		onDestroy(() => {});
		$$renderer.push(`<!--[0--><div class="power-screen svelte-1v9hpqx"><img id="logo-on-power" src="/images/afterlight-wordmark-cream.svg" alt="Afterlight Systems" class="svelte-1v9hpqx"/> <button class="svelte-1v9hpqx">POWER ON</button></div>`);
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/components/startup/SystemHelp.svelte
function SystemHelp($$renderer, $$props) {
	let { onBack } = $$props;
	$$renderer.push(`<main class="help-screen"><h1>System Help</h1> <button type="button">Return to login</button></main>`);
}
// src/lib/components/startup/Access.svelte
function Access($$renderer, $$props) {
	let useremail = "";
	let isSubmitting = false;
	let { onBack } = $$props;
	$$renderer.push(`<!--[-1--><div class="desktop svelte-1f8hbeo"><div class="window svelte-1f8hbeo"><div class="title-bar svelte-1f8hbeo">Afterlight Sign Up System</div> <div class="window-main svelte-1f8hbeo"><div class="content svelte-1f8hbeo"><h2>Welcome, New Investigator.</h2> <p>Please identify yourself.</p> <form class="svelte-1f8hbeo"><label for="useremail">Enter your real email:</label> <input id="useremail" type="email"${attr("value", useremail)} autocomplete="email" required="" class="svelte-1f8hbeo"/> `);
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <button type="submit"${attr("disabled", isSubmitting, true)} class="svelte-1f8hbeo">${escape_html("Get Access")}</button></form> <button type="button" class="svelte-1f8hbeo">Return to login</button></div></div> <div class="status svelte-1f8hbeo"><h3 class="svelte-1f8hbeo">System Status: ONLINE</h3> <h3 class="svelte-1f8hbeo">Research Net: CONNECTED</h3></div></div></div>`);
	$$renderer.push(`<!--]-->`);
}
// src/lib/components/LoginScreen.svelte
function LoginScreen($$renderer) {
	let username = "";
	let accessCode = "";
	let showSystemHelp = false;
	let showAccess = false;
	$$renderer.push(`<div class="desktop svelte-2jpsc9">`);
	if (showSystemHelp) {
		$$renderer.push("<!--[0-->");
		SystemHelp($$renderer, { onBack: () => showSystemHelp = false });
	} else if (showAccess) {
		$$renderer.push("<!--[1-->");
		Access($$renderer, { onBack: () => showAccess = false });
	} else $$renderer.push(`<!--[-1--><div class="window svelte-2jpsc9"><div class="title-bar svelte-2jpsc9">Afterlight System Login</div> <div class="window-main svelte-2jpsc9"><div class="content svelte-2jpsc9"><h2 class="svelte-2jpsc9">Welcome, Investigator.</h2> <p>Please identify yourself.</p> <form class="svelte-2jpsc9"><label for="username">Enter Afterlight Email:</label> <input id="username"${attr("value", username)} autocomplete="username" required="" class="svelte-2jpsc9"/> <label for="access-code">Access Code:</label> <input id="access-code"${attr("value", accessCode)} autocomplete="off" required="" class="svelte-2jpsc9"/> <div><button type="submit" class="svelte-2jpsc9">Log In</button> <button type="button" class="svelte-2jpsc9">System Help</button> <button type="button" class="svelte-2jpsc9">Get Access</button></div></form></div> <div class="brand-panel svelte-2jpsc9"><img class="logo svelte-2jpsc9" src="/images/afterlight-logo-transparent.png" alt="Afterlight logo"/></div></div> <div class="status svelte-2jpsc9"><h3 class="svelte-2jpsc9">System Status: ONLINE</h3> <h3 class="svelte-2jpsc9">Research Net : CONNECTED</h3></div></div>`);
	$$renderer.push(`<!--]--></div>`);
}
// src/routes/+page.svelte
function _page($$renderer) {
	let bootComplete = false;
	if (bootComplete) {
		$$renderer.push("<!--[0-->");
		LoginScreen($$renderer, {});
	} else {
		$$renderer.push("<!--[-1-->");
		BootSequence($$renderer, { onComplete: () => bootComplete = true });
	}
	$$renderer.push(`<!--]-->`);
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map