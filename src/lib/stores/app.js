import { writable } from "svelte/store"

const storeData = writable({
  settings: false,

  image: null,

  fontSize: 10,

  colorPalette: 'miradors',
  palettes: ['miradors', 'hilda02', 'olympia', 'tsu_arcade', 'jung_bird', 'harvest', 'frozen-rose', 'kov_01', 'cc232', 'rohlfs_4', 'sprague']
});

export const store = {
  ...storeData,
  
  restore({palettes, settings, ...rest}) {
    storeData.update(state => ({
      ...state,
      ...rest
    }))
  },

  toggleSettings: (val) => {
    storeData.update(state => ({
      ...state,
      settings: typeof val === 'undefined' ? !state.settings : state.settings
    }));
  },

  setImage(image) {
    storeData.update(state => ({
      ...state,
      image
    }));
  },

  setColorPalette(colorPalette) {
    storeData.update(state => ({
      ...state,
      colorPalette
    }));
  },

  setFontSize(fontSize) {
    storeData.update(state => ({
      ...state,
      fontSize
    }));
  }
}