export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set(["animations/afterlight/access-denied-still.svg","animations/afterlight/access-denied.svg","animations/afterlight/celebration-still.svg","animations/afterlight/celebration.svg","animations/afterlight/fake-reassurance-still.svg","animations/afterlight/fake-reassurance.svg","animations/afterlight/hiding-evidence-still.svg","animations/afterlight/hiding-evidence.svg","animations/afterlight/idle-still.svg","animations/afterlight/idle.svg","animations/afterlight/legacy-attention-still.svg","animations/afterlight/legacy-attention.svg","animations/afterlight/legacy-celebration-still.svg","animations/afterlight/legacy-celebration.svg","animations/afterlight/legacy-idle-still.svg","animations/afterlight/legacy-idle.svg","animations/afterlight/legacy-nervous-still.svg","animations/afterlight/legacy-nervous.svg","animations/afterlight/legacy-system-glitch-still.svg","animations/afterlight/legacy-system-glitch.svg","animations/afterlight/loading-full-turn-still.svg","animations/afterlight/loading-full-turn.svg","animations/afterlight/loading-wordmark-still.svg","animations/afterlight/loading-wordmark.svg","animations/afterlight/manifest.json","animations/afterlight/planet-front.svg","animations/afterlight/planet-rear.svg","animations/afterlight/planet-spin-still.svg","animations/afterlight/planet-spin.svg","animations/afterlight/pointing-still.svg","animations/afterlight/pointing.svg","animations/afterlight/reading-clipboard-still.svg","animations/afterlight/reading-clipboard.svg","animations/afterlight/searching-still.svg","animations/afterlight/searching.svg","animations/afterlight/silent-stare-still.svg","animations/afterlight/silent-stare.svg","animations/afterlight/suspicious-glance-still.svg","animations/afterlight/suspicious-glance.svg","animations/afterlight/system-glitch-still.svg","animations/afterlight/system-glitch.svg","animations/afterlight/talking-still.svg","animations/afterlight/talking.svg","animations/afterlight/thinking-still.svg","animations/afterlight/thinking.svg","animations/afterlight/warning-still.svg","animations/afterlight/warning.svg","animations/afterlight/welcome-wave-still.svg","animations/afterlight/welcome-wave.svg","audio/.gitkeep","images/.gitkeep","images/afterlight-logo-transparent.png","images/afterlight-logo-transparent.svg","images/afterlight-logo.png","images/afterlight-logo.svg","images/afterlight-star.png","images/afterlight-star.svg","images/afterlight-wordmark-cream.png","images/afterlight-wordmark-cream.svg","images/afterlight-wordmark-green.png","images/afterlight-wordmark-green.svg","images/desktop-background.png","images/icons/archives.svg","images/icons/case-files.svg","images/icons/comms.svg","images/icons/evidence.svg","images/icons/mail.svg","images/icons/mr-planet.svg","images/icons/planet-scan.svg","images/icons/settings.svg","images/icons/signal-monitor.svg","images/icons/terminal.svg","images/login-background.png","images/login-background.svg","images/mr-planet.png","images/mr-planet.svg","images/research-emblem.png","images/research-emblem.svg","logos/.gitkeep","robots.txt"]),
	mime_types: {".svg":"image/svg+xml",".json":"application/json",".png":"image/png",".txt":"text/plain"},
	client: {start:"_app/immutable/entry/start.BfWpViXi.js",app:"_app/immutable/entry/app.Cg1MhQBS.js",imports:["_app/immutable/entry/start.BfWpViXi.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/DclECHGd.js","_app/immutable/chunks/-lgwZXsO.js","_app/immutable/chunks/f3N47qAg.js","_app/immutable/chunks/BMKoayT7.js","_app/immutable/chunks/BGjuT00Z.js","_app/immutable/entry/app.Cg1MhQBS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js')),
		__memo(() => import('./nodes/3.js'))
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
		},
		{
			id: "/terminal",
			pattern: /^\/terminal\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
