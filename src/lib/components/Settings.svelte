<script>
	import { get } from 'svelte/store';
	import { game, app } from '$lib/store.js';
	import { onMount } from 'svelte';
	import SettingsSchema from './SettingsSchema.svelte';

	let amount = get(game).playerCount;
	let lifeTotal = get(game).lifeTotal;
	let hasNoSettings = true;

	function onSettingsFileChange(e) {
		const [file] = e.target.files;

		app.setImage(URL.createObjectURL(file));
	}

	function onClearImage() {
		console.log('hey');
		app.setImage(null);
	}

	function onReset() {
		game.reset();
	}

	function saveSettings() {
		const appSettings = get(app);
		const gameSettings = get(game);

		localStorage.setItem(
			'settings',
			JSON.stringify({
				app: appSettings,
				game: gameSettings
			})
		);
	}

	function restoreSettings() {
		const settings = localStorage.getItem('settings');

		if (!settings) {
			return;
		}

		try {
			const { game: gameSettings, app: appSettings } = JSON.parse(settings);
			app.restore(appSettings);

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					game.restore(gameSettings);
				});
			});
		} catch (e) {
			localStorage.removeItem('settings');
		}
	}

	function onFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}

	function toggleTracking(type) {
		game.toggleTracking(type);
	}

	onMount(() => {
		const previousSettings = localStorage.getItem('settings');
		hasNoSettings = !previousSettings;
	});

	function onInput(e) {
		const name = e.target.name;

		switch (name) {
			case 'players':
				game.setPlayers(parseInt(e.target.value));
				break;
			case 'lifeTotal':
				game.setKey('lifeTotal', parseInt(e.target.value));
				break;
			case 'fontSize':
				app.setFontSize(parseInt(e.target.value));
				break;
		}
	}

	function onPaletteChange(e) {
		app.setColorPalette(e.target.value);
	}

	function hardReset() {
		localStorage.removeItem('settings');
		localStorage.removeItem('backup');
		window.location.reload();
	}

	$: settings = [
		{
			title: 'Settings',
			inputs: [
				{
					title: 'Players',
					name: 'players',
					type: 'number',
					value: amount,
					input: onInput,
					options: {
						min: 2,
						max: 4
					}
				},
				{
					title: 'Life Total',
					name: 'lifeTotal',
					type: 'number',
					value: lifeTotal,
					input: onInput,
					options: {
						min: 1,
						max: 100
					}
				}
			]
		},

		{
			title: 'Gameplay',
			inputs: [
				{
					title: 'Reset Totals',
					name: 'totals',
					type: 'button',
					click: onReset,
					text: 'Reset'
				},
				{
					title: 'Display Names',
					name: 'names',
					type: 'checkbox',
					value: $app.displayNames,
					change: () => app.toggleDisplayNames()
				},
				{
					title: 'Track Poison',
					name: 'poison',
					type: 'checkbox',
					value: $game.tracking.poison,
					change: () => toggleTracking('poison')
				},
				{
					title: 'Track Commander Damage',
					name: 'commander',
					type: 'checkbox',
					value: $game.tracking.commander,
					change: () => toggleTracking('commander')
				},
				{
					title: ' ',
					name: 'tracker',
					type: 'comment',
					text: 'Double tap the section with the values in, to make them larger'
				}
			]
		},

		{
			title: 'App',
			inputs: [
				{
					title: 'Save settings',
					name: 'save',
					type: 'button',
					click: saveSettings,
					text: 'Save'
				},
				{
					title: 'Restore settings',
					name: 'restore',
					type: 'button',
					click: restoreSettings,
					text: 'Restore',
					options: {
						disabled: hasNoSettings
					}
				},
				{
					title: 'Fullscreen',
					name: 'fullscreen',
					type: 'button',
					click: onFullscreen,
					text: 'Toggle'
				},
				{
					title: 'Settings image',
					name: 'image',
					type: 'image',
					change: onSettingsFileChange,
					value: $app.image
				},
				{
					title: 'Clear image',
					name: 'clearImage',
					type: 'button',
					click: onClearImage,
					text: 'Clear',
					options: {
						disabled: !$app.image
					}
				},
				{
					title: 'Colour Palette',
					name: 'palette',
					type: 'select',
					change: onPaletteChange,
					value: $app.colorPalette,
					options: [...$app.palettes].map((option) => ({
						value: option,
						label: option
					}))
				},
				{
					title: 'Font Size',
					name: 'fontSize',
					type: 'number',
					value: $app.fontSize,
					input: onInput,
					options: {
						min: 1,
						max: 20
					}
				}
			]
		},

		{
			title: 'Reset',
			inputs: [
				{
					title: 'Fresh everything',
					name: 'fresh',
					type: 'button',
					click: hardReset,
					text: 'Reset'
				}
			]
		}
	];
</script>

<SettingsSchema {settings} />
