import { derived, get } from "svelte/store"
import {store as game} from "./stores/game.js"
import {store as app} from "./stores/app.js"
import { debounce } from "./utils.js"


export {store as game} from "./stores/game.js"
export {store as history} from "./stores/history.js"
export {store as app} from "./stores/app.js"

const listener = derived([game, app], () => {
  return Date.now();
});


function backup() {

  if (typeof localStorage !== 'undefined') {
    const appSettings = get(app);
    const gameSettings = get(game);
    
    localStorage.setItem('backup', JSON.stringify({
      time: Date.now(),
      app: appSettings,
      game: gameSettings
    }));
  }
}

const debouncedBackup = debounce(backup, 1000);

listener.subscribe(() => {
  debouncedBackup();
});