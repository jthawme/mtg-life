<script>
	import "normalize.css";

	import {differenceInDays, formatRelative} from 'date-fns';
	import * as tome from 'chromotome';
	import {get} from "svelte/store";
	import tinycolor from 'tinycolor2';
	import { pwaInfo } from 'virtual:pwa-info';
	import {app, game} from "$lib/store.js";
	import '../app.scss';
	import { onMount } from "svelte";

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	$: bgColor = tome.get($app.colorPalette).background
	$: fontSize = $app.fontSize;

	function updateBody(_bgColor, _fontSize) {
		document.body.style.setProperty("--bg", _bgColor)
		document.body.style.setProperty("--global-font-size", fontSize);
		document.body.classList.toggle("light", !tinycolor(_bgColor).isDark())
	}

	$: if (typeof document !== 'undefined') (
		updateBody(bgColor, fontSize)
	)

	function checkBackup() {
		const item = localStorage.getItem('backup');

		if (!item) {
			return;
		}

		try {
			const {time, app: appSettings, game: gameSettings} = JSON.parse(item);

			if (differenceInDays(new Date(time), new Date()) < 1) {
				app.restore(appSettings);
				game.restore(gameSettings);
			} else if (confirm(`Do you want to load a game from ${formatRelative(new Date(time), new Date())}`)) {
				app.restore(appSettings);
				game.restore(gameSettings);
			}
		} catch (e) {
			//
		} finally {
			localStorage.removeItem('backup');
		}
	}

	onMount(() => {
		checkBackup();
	});
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<slot />
