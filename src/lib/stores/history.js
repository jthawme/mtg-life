import { writable, get } from "svelte/store";

const historyData = writable([]);

export const store = {
  ...historyData,

  commit: (currentState) => {
    historyData.update(state => ([...state, currentState]));
  },

  hasHistory: () => {
    return get(historyData).length > 0;
  }
}