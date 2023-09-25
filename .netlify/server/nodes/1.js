

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.82db6b48.js","_app/immutable/chunks/scheduler.2b6a3644.js","_app/immutable/chunks/index.0167e7af.js","_app/immutable/chunks/singletons.f2d3d63b.js","_app/immutable/chunks/index.fb7234a1.js"];
export const stylesheets = [];
export const fonts = [];
