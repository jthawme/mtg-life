import * as tome from 'chromotome';
import { nameByRace } from 'fantasy-name-generator';
import { writable, get, derived } from 'svelte/store';
import ShortUniqueId from 'short-unique-id';
import { store as history } from './history.js';
import { store as app } from './app.js';
import { getNth, randomFrom } from '../utils.js';

const uid = new ShortUniqueId();

const defaultStoreData = {
	playerCount: 4,
	lifeTotal: 40,
	tracking: {
		poison: false,
		commander: false
	}
};

const createFakePlayer = ({ lifeTotal = defaultStoreData.lifeTotal, index = 0 } = {}) => {
	return {
		id: uid.rnd(),
		name: nameByRace(randomFrom(['human', 'angel', 'dwarf', 'elf', 'halfling']), {
			gender: randomFrom(['female', 'male'])
		}),
		life: lifeTotal,
		settings: {
			flipped: 0,
			color: getNth(tome.get(get(app).colorPalette || 'hilda02').colors, index),
			textColor: null
		},
		values: {}
	};
};

const storeData = writable({
	...defaultStoreData,
	players: new Array(4).fill(0).map((_, index) =>
		createFakePlayer({
			index
		})
	)
});

export const store = {
	...storeData,

	restore({ players, ...settings }) {
		storeData.update((state) => ({
			...settings,
			players: players.map((player) => ({ ...player }))
		}));
	},

	reset() {
		const players = get(storeData).players;

		storeData.update((state) => ({
			...state,
			players: players.map((player) => ({
				...player,
				life: state.lifeTotal,
				values: {}
			}))
		}));
	},

	mergePlayerInfo: (id, info) => {
		storeData.update((state) => {
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
		store.mergePlayerInfo(id, {
			[key]: value
		});
	},

	setPlayerSettings: (id, key, value) => {
		const { players } = get(storeData);

		const player = players.find((player) => player.id === id);
		store.setPlayerValue(id, 'settings', {
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
		const { players } = get(storeData);

		const player = players.find((player) => player.id === id);

		store.setPlayerValue(id, key, player[key] + change);
	},

	changeLife(id, change) {
		const { players } = get(storeData);

		const lifeTotals = players.map((player) => player.life);

		if (!history.hasHistory()) {
			history.commit({
				lifeTotals
			});
		}

		store.modNumericPlayerValue(id, 'life', change);

		history.commit({
			lifeTotals: get(storeData).players.map((player) => player.life)
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

		storeData.update((state) => ({
			...state,
			playerCount: val,
			players: [...state.players, ...new Array(val).fill(null)]
				.slice(0, val)
				.map((playerOrNull, index) => {
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
		storeData.update((state) => ({
			...state,
			[key]: value
		}));
	},

	setPlayerTrackedValue: (id, key, value) => {
		const { players } = get(storeData);

		const player = players.find((player) => player.id === id);
		store.setPlayerValue(id, 'values', {
			...player.values,
			[key]: value
		});
	},

	/**
	 *
	 * @param {'poison' | 'commander'} type Which type to toggle tracking of
	 * @param {boolean} [val]
	 */
	toggleTracking: (type, val) => {
		storeData.update((state) => ({
			...state,
			tracking: {
				...state.tracking,
				[type]: typeof val === 'undefined' ? !state.tracking[type] : val
			}
		}));
	}
};

const paletteChange = derived(app, ($app) => $app.colorPalette);

// WHEN COLOR PALETTE CHANGES UPDATE ALL PLAYERS
paletteChange.subscribe((colorPalette) => {
	const palette = tome.get(colorPalette);

	const players = get(storeData).players;

	players.forEach((player, idx) => {
		store.setPlayerSettings(player.id, 'color', getNth(palette.colors, idx));
		store.setPlayerSettings(player.id, 'textColor', null);
	});
});
