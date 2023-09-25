<script>
	import "normalize.css";
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.scss';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<slot />
