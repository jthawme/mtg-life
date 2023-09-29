import { writable } from 'svelte/store';

const storeData = writable({
	settings: false,

	image: null,

	fontSize: 10,
	displayNames: false,

	colorPalette: 'miradors',
	palettes: [
		'miradors',
		'foxshelter',
		'rag-mysore',
		'roygbiv-warm',
		'hilda02',
		'olympia',
		'iiso_daily',
		'jung_bird',
		'harvest',
		'frozen-rose',
		'kov_01',
		'cc232',
		'rohlfs_4',
		'sprague',
		'revolucion',
		'system.#04',
		'cc245'
	]
});

export const store = {
	...storeData,

	restore({ palettes, settings, ...rest }) {
		storeData.update((state) => ({
			...state,
			...rest
		}));
	},

	toggleSettings: (val) => {
		storeData.update((state) => ({
			...state,
			settings: typeof val === 'undefined' ? !state.settings : val
		}));
	},

	toggleDisplayNames: (val) => {
		storeData.update((state) => ({
			...state,
			displayNames: typeof val === 'undefined' ? !state.displayNames : val
		}));
	},

	setImage(image) {
		storeData.update((state) => ({
			...state,
			image
		}));
	},

	setColorPalette(colorPalette) {
		storeData.update((state) => ({
			...state,
			colorPalette
		}));
	},

	setFontSize(fontSize) {
		storeData.update((state) => ({
			...state,
			fontSize
		}));
	}
};
