import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.7aebce72.js","app":"_app/immutable/entry/app.05250aba.js","imports":["_app/immutable/entry/start.7aebce72.js","_app/immutable/chunks/scheduler.2b6a3644.js","_app/immutable/chunks/singletons.f2d3d63b.js","_app/immutable/chunks/index.fb7234a1.js","_app/immutable/entry/app.05250aba.js","_app/immutable/chunks/scheduler.2b6a3644.js","_app/immutable/chunks/index.0167e7af.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
