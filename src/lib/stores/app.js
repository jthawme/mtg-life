import { writable } from "svelte/store"

const storeData = writable({
  settings: false,

  image: null
});

export const store = {
  ...storeData,

  toggleSettings: (val) => {
    storeData.update(state => ({
      ...state,
      settings: typeof val === 'undefined' ? !state.settings : state.settings
    }));
  },

  setImage(url) {
    storeData.update(state => ({
      ...state,
      image: url
    }));
  }
}