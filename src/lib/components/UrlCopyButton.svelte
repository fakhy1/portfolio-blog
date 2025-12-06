<script lang="ts">
	import { toast } from "svelte-sonner";
	import Button from "./ui/button/button.svelte";
	import { CheckIcon, LinkIcon } from "@lucide/svelte";

	let { url }: {url?: string} = $props();

	let isCopied = $state(false);

	function handleCopyUrl() {
		window.navigator.clipboard.writeText(url ?? window.location.href);
		toast("URL copied to clipboard");
		isCopied = true;
		setTimeout(() => isCopied = false, 2000);
	}
</script>

<Button disabled={isCopied} size="icon-sm" variant="ghost" onclick={handleCopyUrl}>
	{#if isCopied}
		<CheckIcon class="size-4 text-green-500" />
	{:else}
		<LinkIcon class="size-4" />
	{/if}
</Button>