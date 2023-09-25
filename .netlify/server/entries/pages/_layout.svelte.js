import { c as create_ssr_component } from "../../chunks/ssr.js";
const normalize = "";
const pwaInfo = { "pwaInDevEnvironment": false, "webManifest": { "href": "/manifest.webmanifest", "useCredentials": false, "linkTag": '<link rel="manifest" href="/manifest.webmanifest">' } };
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let webManifestLink;
  webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";
  return `${$$result.head += `<!-- HEAD_svelte-1pmpekp_START --><!-- HTML_TAG_START -->${webManifestLink}<!-- HTML_TAG_END --><!-- HEAD_svelte-1pmpekp_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
