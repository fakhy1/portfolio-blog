<script lang="ts">
  import { Button } from "$lib/components/ui/button";
	import { GlobeIcon, LoaderCircleIcon, LockIcon } from "@lucide/svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
	import { updatePostStatus } from "$lib/mutaters";
	import { writable } from "svelte/store";

  const {slug, isPublished, hide } = $props()
  const isUpdating = writable(false)

</script>

{#if !hide}
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button size="sm" class="w-22" disabled={$isUpdating} onclick={
        isPublished ?
        () => updatePostStatus({slug, status: 'draft', isUpdating}) :
        () => updatePostStatus({slug, status: 'publish', isUpdating})
      }>
        {#if $isUpdating}
          <LoaderCircleIcon class="size-4 animate-spin" />
        {/if}
        {#if !isPublished && !$isUpdating}
          <GlobeIcon class="size-4" />
          Publish
        {:else if !$isUpdating}
          <LockIcon class="size-4" />
          Draft
        {/if}
      </Button></Tooltip.Trigger>
    <Tooltip.Content>
      {#if !isPublished && !$isUpdating}
        Publish this Post.
      {:else if !$isUpdating}
        Draft this Post.
      {/if}
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
{/if}