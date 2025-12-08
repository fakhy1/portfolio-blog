<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher} from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	
	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher themeStorageKey="theme" defaultMode="system" />
{#if data.auth.isAuthenticated}
	<Header />
{/if}
{@render children()}
<Toaster position="top-right" />