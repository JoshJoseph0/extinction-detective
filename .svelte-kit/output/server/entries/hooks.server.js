import { t as building } from "../chunks/server.js";
import "@better-auth/core/api";
// node_modules/better-auth/dist/integrations/svelte-kit.mjs
var svelteKitHandler = async ({ auth, event, resolve, building }) => {
	if (building) return resolve(event);
	const { request, url } = event;
	if (isAuthPath(url.toString(), auth.options)) return auth.handler(request);
	return resolve(event);
};
function isAuthPath(url, options) {
	const _url = new URL(url);
	const baseURLStr = typeof options.baseURL === "string" ? options.baseURL : void 0;
	const baseURL = new URL(`${baseURLStr || _url.origin}${options.basePath || "/api/auth"}`);
	if (_url.origin !== baseURL.origin) return false;
	if (!_url.pathname.startsWith(baseURL.pathname.endsWith("/") ? baseURL.pathname : `${baseURL.pathname}/`)) return false;
	return true;
}
// src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	if (building) return resolve(event);
	const { auth } = await import("../chunks/auth.js");
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
};
export { handle };

//# sourceMappingURL=hooks.server.js.map