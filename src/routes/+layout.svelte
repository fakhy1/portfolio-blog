<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher} from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher themeStorageKey="theme" defaultMode="system" />
{@render children()}
<Toaster position="top-right" />