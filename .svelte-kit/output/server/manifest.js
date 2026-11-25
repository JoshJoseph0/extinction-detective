export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set(["audio/.gitkeep","images/.gitkeep","images/afterlight-logo-transparent.png","images/afterlight-logo-transparent.svg","images/afterlight-logo.png","images/afterlight-logo.svg","images/afterlight-star.png","images/afterlight-star.svg","images/afterlight-wordmark-cream.png","images/afterlight-wordmark-cream.svg","images/afterlight-wordmark-green.png","images/afterlight-wordmark-green.svg","images/desktop-background.png","images/icons/archives.svg","images/icons/case-files.svg","images/icons/comms.svg","images/icons/evidence.svg","images/icons/mail.svg","images/icons/mr-planet.svg","images/icons/planet-scan.svg","images/icons/settings.svg","images/icons/signal-monitor.svg","images/icons/terminal.svg","images/login-background.png","images/login-background.svg","images/mr-planet.png","images/mr-planet.svg","images/research-emblem.png","images/research-emblem.svg","logos/.gitkeep","robots.txt"]),
	mime_types: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	client: {start:"_app/immutable/entry/start.CBClm5nx.js",app:"_app/immutable/entry/app.DqnGYnL2.js",imports:["_app/immutable/entry/start.CBClm5nx.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/DclECHGd.js","_app/immutable/chunks/DBTgaPCi.js","_app/immutable/chunks/ghkSXyU0.js","_app/immutable/chunks/BGna6qfj.js","_app/immutable/entry/app.DqnGYnL2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/api/register",
			pattern: /^\/api\/register\/?$/,
			params: [],
			page: null,
			endpoint: __memo(() => import('./entries/endpoints/api/register/_server.ts.js'))
		},
		{
			id: "/api/test-db",
			pattern: /^\/api\/test-db\/?$/,
			params: [],
			page: null,
			endpoint: __memo(() => import('./entries/endpoints/api/test-db/_server.ts.js'))
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
