import {writable, get} from 'svelte/store';
import ShortUniqueId from 'short-unique-id';
import {store as history} from './history.js';

const uid = new ShortUniqueId();

const defaultStoreData = {
  playerCount: 4,
  lifeTotal: 40
};

const colors = ['red', 'blue', 'green', 'yellow'];

const createFakePlayer = ({lifeTotal = defaultStoreData.lifeTotal, index = 0} = {}) => {
  return {
    id: uid.rnd(),
    name: null,
    life: lifeTotal,
    settings: {
      flipped: 0,
      color: colors[index % colors.length],
    }
  }
}

const storeData = writable({
  ...defaultStoreData,
  players: new Array(4).fill(0).map((_, index) => createFakePlayer({
    index
  }))
});

export const store = {
  ...storeData,

  reset() {
    const players = get(storeData).players;

    storeData.update(state => ({
      ...state,
      players: players.map((player) => ({
        ...player,
        life: state.lifeTotal
      }))
    }));
  },

  mergePlayerInfo: (id, info) => {
    storeData.update(state => {
      const playerIndex = state.players.findIndex(item => item.id === id);

      if (playerIndex < 0) {
        return state;
      }

      const currentPlayer = {...state.players[playerIndex]};

      state.players.splice(playerIndex, 1, {
        ...currentPlayer,
        ...info
      });

      return state;
    })
  },

  setPlayerValue: (id, key, value) => {
    store.mergePlayerInfo(id, {
      [key]: value
    });
  },

  setPlayerSettings: (id, key, value) => {
    const {players} = get(storeData);

    const player = players.find(player => player.id === id);
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
    const {players} = get(storeData);

    const player = players.find(player => player.id === id);

    store.setPlayerValue(id, key, player[key] + change);
  },

  changeLife(id, change) {
    const {players} = get(storeData);

    const lifeTotals = players.map(player => player.life);

    if (!history.hasHistory()) {
      history.commit({
        lifeTotals
      });
    }

    store.modNumericPlayerValue(id, 'life', change);
    
    history.commit({
      lifeTotals: get(storeData).players.map(player => player.life)
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
    
    storeData.update(state => ({
      ...state,
      playerCount: val,
      players: [...state.players, ...new Array(val).fill(null)].slice(0, val).map((playerOrNull, index) => {
        if (playerOrNull !== null) {
          return playerOrNull
        }

        return createFakePlayer({
          ...state,
          index
        });
      })
    }))
  },

  setKey: (key, value) => {
    storeData.update(state => ({
      ...state,
      [key]: value
    }));
  }
}