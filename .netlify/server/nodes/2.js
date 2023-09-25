

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.9bf32cb2.js","_app/immutable/chunks/scheduler.2b6a3644.js","_app/immutable/chunks/index.0167e7af.js","_app/immutable/chunks/index.fb7234a1.js"];
export const stylesheets = ["_app/immutable/assets/2.f10e47ad.css"];
export const fonts = [];
