

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.827183d6.js","_app/immutable/chunks/scheduler.2b6a3644.js","_app/immutable/chunks/index.0167e7af.js"];
export const stylesheets = ["_app/immutable/assets/0.162311ee.css"];
export const fonts = [];
