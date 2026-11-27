import * as server from '../entries/pages/terminal/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terminal/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/terminal/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.nzgdyrix.js","_app/immutable/chunks/BMKoayT7.js","_app/immutable/chunks/CgQmzTEN.js","_app/immutable/chunks/f3N47qAg.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/BGjuT00Z.js"];
export const stylesheets = ["_app/immutable/assets/3.DA1EEZRp.css"];
export const fonts = [];
