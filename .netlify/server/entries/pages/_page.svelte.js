import { b as get_store_value, c as create_ssr_component, d as spread, f as escape_object, h as createEventDispatcher, v as validate_component, i as add_attribute, e as escape, a as subscribe, j as each } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import ShortUniqueId from "short-unique-id";
const historyData = writable([]);
const store$2 = {
  ...historyData,
  commit: (currentState) => {
    historyData.update((state) => [...state, currentState]);
  },
  hasHistory: () => {
    return get_store_value(historyData).length > 0;
  }
};
const uid = new ShortUniqueId();
const defaultStoreData = {
  playerCount: 4,
  lifeTotal: 40
};
const colors = ["red", "blue", "green", "yellow"];
const createFakePlayer = ({ lifeTotal = defaultStoreData.lifeTotal, index = 0 } = {}) => {
  return {
    id: uid.rnd(),
    name: null,
    life: lifeTotal,
    settings: {
      flipped: 0,
      color: colors[index % colors.length]
    }
  };
};
const storeData$1 = writable({
  ...defaultStoreData,
  players: new Array(4).fill(0).map((_, index) => createFakePlayer({
    index
  }))
});
const store$1 = {
  ...storeData$1,
  reset() {
    const players = get_store_value(storeData$1).players;
    storeData$1.update((state) => ({
      ...state,
      players: players.map((player) => ({
        ...player,
        life: state.lifeTotal
      }))
    }));
  },
  mergePlayerInfo: (id, info) => {
    storeData$1.update((state) => {
      const playerIndex = state.players.findIndex((item) => item.id === id);
      if (playerIndex < 0) {
        return state;
      }
      const currentPlayer = { ...state.players[playerIndex] };
      state.players.splice(playerIndex, 1, {
        ...currentPlayer,
        ...info
      });
      return state;
    });
  },
  setPlayerValue: (id, key, value) => {
    store$1.mergePlayerInfo(id, {
      [key]: value
    });
  },
  setPlayerSettings: (id, key, value) => {
    const { players } = get_store_value(storeData$1);
    const player = players.find((player2) => player2.id === id);
    store$1.setPlayerValue(id, "settings", {
      ...player.settings,
      [key]: value
    });
  },
  /**
   * 
   * @param {string} id 
   * @param {string} key 
   * @param {number} change 
   */
  modNumericPlayerValue: (id, key, change) => {
    const { players } = get_store_value(storeData$1);
    const player = players.find((player2) => player2.id === id);
    store$1.setPlayerValue(id, key, player[key] + change);
  },
  changeLife(id, change) {
    const { players } = get_store_value(storeData$1);
    const lifeTotals = players.map((player) => player.life);
    if (!store$2.hasHistory()) {
      store$2.commit({
        lifeTotals
      });
    }
    store$1.modNumericPlayerValue(id, "life", change);
    store$2.commit({
      lifeTotals: get_store_value(storeData$1).players.map((player) => player.life)
    });
  },
  /**
   * 
   * @param {number} val The amount of players to use
   */
  setPlayers: (val) => {
    if (!val || val < 1) {
      return;
    }
    storeData$1.update((state) => ({
      ...state,
      playerCount: val,
      players: [...state.players, ...new Array(val).fill(null)].slice(0, val).map((playerOrNull, index) => {
        if (playerOrNull !== null) {
          return playerOrNull;
        }
        return createFakePlayer({
          ...state,
          index
        });
      })
    }));
  },
  setKey: (key, value) => {
    storeData$1.update((state) => ({
      ...state,
      [key]: value
    }));
  }
};
const storeData = writable({
  settings: false,
  image: null
});
const store = {
  ...storeData,
  toggleSettings: (val) => {
    storeData.update((state) => ({
      ...state,
      settings: typeof val === "undefined" ? !state.settings : state.settings
    }));
  },
  setImage(url) {
    storeData.update((state) => ({
      ...state,
      image: url
    }));
  }
};
const Settings$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { class: "ionicon" },
      { viewBox: "0 0 512 512" },
      escape_object($$props)
    ],
    {}
  )}><circle cx="256" cy="256" r="48"/><path d="m470.39 300-.47-.38-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.59 1.59 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56-5.57 39.67a16 16 0 0 1-8.13 11.82 175.21 175.21 0 0 0-10 5.82 15.92 15.92 0 0 1-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.59 1.59 0 0 1 .13.22 26.86 26.86 0 0 0 32.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56 5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0 0 32.48-11.34 2.53 2.53 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11zm-134.48-40.24a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"/></svg>`;
});
const Close_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { class: "ionicon" },
      { viewBox: "0 0 512 512" },
      escape_object($$props)
    ],
    {}
  )}><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z"/></svg>`;
});
const Modal_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".outer.svelte-1ijyd8e{position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0, 0, 0, 0.5);backdrop-filter:blur(10px);z-index:20}.close.svelte-1ijyd8e{position:absolute;top:10px;right:10px;padding:0;margin:0;border:none;background-color:transparent;cursor:pointer}.close.svelte-1ijyd8e:hover,.close.svelte-1ijyd8e:focus-visible{opacity:0.5}.close.svelte-1ijyd8e svg{fill:white;width:24px}.inner.svelte-1ijyd8e{position:absolute;top:50%;left:50%;max-height:var(--inner-height, 80%);width:var(--inner-width, 80%);height:100%;max-width:var(--inner-max-width, 560px);background-color:#222;color:white;padding:20px;border-radius:20px;transform:translate3d(-50%, -50%, 0);overflow:auto}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { canClose = true } = $$props;
  createEventDispatcher();
  if ($$props.canClose === void 0 && $$bindings.canClose && canClose !== void 0)
    $$bindings.canClose(canClose);
  $$result.css.add(css$2);
  return `  <div class="outer svelte-1ijyd8e">${canClose ? `<button class="close svelte-1ijyd8e">${validate_component(Close_circle, "Close").$$render($$result, {}, {}, {})}</button>` : ``} <div class="inner svelte-1ijyd8e">${slots.default ? slots.default({}) : ``}</div> </div>`;
});
const PlayerTile_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.tile.svelte-19m9anh.svelte-19m9anh{position:relative;display:flex;flex-direction:column;border-radius:20px;background-color:var(--color);overflow:hidden}.hover.svelte-19m9anh.svelte-19m9anh{position:absolute;width:10px;height:10px;left:calc(var(--x) * 1px);top:calc(var(--y) * 1px);transform:translate3d(-50%, -50%, 0) rotate(calc(var(--rotation) * 1deg));z-index:10;pointer-events:none}.hover-inner.svelte-19m9anh.svelte-19m9anh{position:absolute;bottom:100%;left:50%;transform:translate3d(-50%, 0, 0);border-radius:10px;padding:5px 10px;font-size:1.5rem;font-weight:bold;color:rgb(153, 12, 12);background-color:rgb(221, 121, 121)}.hover.positive.svelte-19m9anh .hover-inner.svelte-19m9anh{color:rgb(19, 131, 19);background-color:rgb(136, 240, 136)}.hover.positive.svelte-19m9anh .hover-inner.svelte-19m9anh:before{content:"+"}.tile-hit-area.svelte-19m9anh.svelte-19m9anh{position:relative;display:grid;grid-template-rows:repeat(2, 1fr);transform:rotate(calc(var(--rotation) * 1deg));flex-grow:1}.tile-hit-area-display.svelte-19m9anh.svelte-19m9anh{position:absolute;top:50%;left:50%;transform:translate3d(-50%, -50%, 0);font-size:10vw;font-weight:bold}.tile-hit-area-el.svelte-19m9anh.svelte-19m9anh{position:relative;z-index:2;opacity:0;border:none;background:transparent;padding:0;margin:0;border-radius:0;cursor:pointer}.tile-hit-area-el.svelte-19m9anh.svelte-19m9anh:active{opacity:0.5}.tile-hit-area-el--top.svelte-19m9anh.svelte-19m9anh{background-color:green}.tile-hit-area-el--bottom.svelte-19m9anh.svelte-19m9anh{background-color:red}.settings-btn.svelte-19m9anh.svelte-19m9anh{position:absolute;bottom:10px;left:50%;transform:translate3d(-50%, 0, 0);z-index:10;line-height:0;background-color:transparent;border:none;padding:0;margin:0;opacity:0.25}.settings-btn.svelte-19m9anh svg{width:24px}',
  map: null
};
const PlayerTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let color;
  let rotation;
  let difference;
  let style;
  createEventDispatcher();
  let { id } = $$props;
  let { settings } = $$props;
  let { life = 0 } = $$props;
  let { debounceTime = 1e3 } = $$props;
  let el = null;
  let mouseX = 0;
  let mouseY = 0;
  let elX = 0;
  let elY = 0;
  let displayedLife = life;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0)
    $$bindings.settings(settings);
  if ($$props.life === void 0 && $$bindings.life && life !== void 0)
    $$bindings.life(life);
  if ($$props.debounceTime === void 0 && $$bindings.debounceTime && debounceTime !== void 0)
    $$bindings.debounceTime(debounceTime);
  $$result.css.add(css$1);
  color = settings?.color ?? "silver";
  rotation = settings?.flipped ?? 0;
  displayedLife = life;
  difference = displayedLife - life;
  style = Object.entries({
    "--color": color,
    "--x": mouseX - elX,
    "--y": mouseY - elY,
    "--rotation": rotation * 90
  }).map((tuples) => tuples.join(": ")).join("; ");
  return ` <div class="tile svelte-19m9anh"${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}>${``} <button class="settings-btn svelte-19m9anh">${validate_component(Settings$1, "Settings").$$render($$result, {}, {}, {})}</button> ${difference !== 0 ? `<div class="${["hover svelte-19m9anh", difference > 0 ? "positive" : ""].join(" ").trim()}"><div class="hover-inner svelte-19m9anh">${escape(difference)}</div></div>` : ``} <div class="tile-hit-area svelte-19m9anh"><button tabindex="-1" class="tile-hit-area-el tile-hit-area-el--top svelte-19m9anh"></button> <button tabindex="-1" class="tile-hit-area-el tile-hit-area-el--bottom svelte-19m9anh"></button> <span class="tile-hit-area-display svelte-19m9anh">${escape(displayedLife)}</span></div> </div>`;
});
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $app, $$unsubscribe_app;
  $$unsubscribe_app = subscribe(store, (value) => $app = value);
  let amount = get_store_value(store$1).playerCount;
  let lifeTotal = get_store_value(store$1).lifeTotal;
  {
    store$1.setPlayers(amount);
  }
  {
    store$1.setKey("lifeTotal", lifeTotal);
  }
  $$unsubscribe_app();
  return `<div><div class="group"><span class="group-title" data-svelte-h="svelte-j6bg7c">Settings</span> <label class="label"><span class="label-title" data-svelte-h="svelte-duwqo6">Players</span> <span class="label-input"><input type="number" min="2" max="4"${add_attribute("value", amount, 0)}></span></label> <label class="label"><span class="label-title" data-svelte-h="svelte-14wkohw">Life total</span> <span class="label-input"><input type="number" min="1" max="100"${add_attribute("value", lifeTotal, 0)}></span></label></div> <div class="group"><span class="group-title" data-svelte-h="svelte-1qwp58c">App</span> <label class="label"><span class="label-title" data-svelte-h="svelte-1vpafsk">Settings image</span> <span class="label-input"><input type="file" accept="image/*"> <span data-svelte-h="svelte-buwd0q">Select</span> ${$app.image ? `<img${add_attribute("src", $app.image, 0)} alt="">` : ``}</span></label></div> <div class="group"><span class="group-title" data-svelte-h="svelte-h08l4l">Gameplay</span> <label class="label"><span class="label-title" data-svelte-h="svelte-z47w42">Reset totals</span> <span class="label-input"><button data-svelte-h="svelte-1yn5h7w">Do it</button></span></label></div> </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tile-wrapper.svelte-11k707i.svelte-11k707i{width:100vw;height:100dvh;display:grid;padding:1rem;gap:1rem;grid-template-columns:repeat(2, 1fr);grid-template-rows:repeat(2, 1fr);grid-auto-columns:1fr}.tile-wrapper.row.svelte-11k707i.svelte-11k707i{grid-template-rows:1fr}.tile-wrapper.svelte-11k707i > *:nth-child(2n-1):nth-last-of-type(1){grid-column-end:span 2}.settings-btn.svelte-11k707i.svelte-11k707i{position:absolute;top:50%;left:50%;transform:translate3d(-50%, -50%, 0);width:100px;height:100px;border-radius:100%;border:none;cursor:pointer;z-index:10;padding:0;margin:0;overflow:hidden;background-color:#111;color:white}.settings-btn.hasImage.svelte-11k707i img.svelte-11k707i{width:100%;height:100%;object-fit:contain}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $app, $$unsubscribe_app;
  let $game, $$unsubscribe_game;
  $$unsubscribe_app = subscribe(store, (value) => $app = value);
  $$unsubscribe_game = subscribe(store$1, (value) => $game = value);
  $$result.css.add(css);
  $$unsubscribe_app();
  $$unsubscribe_game();
  return `${$app.settings ? `${validate_component(Modal, "Modal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}`;
    }
  })}` : ``} <div class="${["tile-wrapper svelte-11k707i", $game.players.length <= 2 ? "row" : ""].join(" ").trim()}">${each($game.players, (player) => {
    return `${validate_component(PlayerTile, "PlayerTile").$$render($$result, Object.assign({}, player), {}, {})}`;
  })} <button class="${["settings-btn svelte-11k707i", !!$app.image ? "hasImage" : ""].join(" ").trim()}">${$app.image ? `<img${add_attribute("src", $app.image, 0)} alt="" class="svelte-11k707i">` : `Settings`}</button> </div>`;
});
export {
  Page as default
};
