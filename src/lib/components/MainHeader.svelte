<script lang="ts">
  import { goto } from "$app/navigation";
  import { PlusIcon } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Select from '$lib/components/ui/select';

  let { isAuthenticated, postsType = $bindable() } = $props();
  const isHidden = $derived(() => !isAuthenticated);

  const selectLabel = $derived(() => {
    if (postsType === 'draft') return 'Draft';
    if (postsType === 'published') return 'Published';
    return 'All';
  });

</script>

<div class="flex items-center justify-between mb-4">
  <div>
    <h5 class="font-medium">Fakhy</h5>
    <p class="text-muted-foreground">Researcher</p>
  </div>
  {#if !isHidden()}
    <div class="flex items-center gap-1">
      <Select.Root type="single" bind:value={postsType}>
        <Select.Trigger size="sm" class="w-28" variant="secondary">
          {selectLabel()}
        </Select.Trigger>
        <Select.Content class="w-48">
          <Select.Group>
            <Select.Label>Post Type</Select.Label>
            <Select.Item value="draft">Draft</Select.Item>
            <Select.Item value="published">Published</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Button size="icon-sm" onclick={() => goto("/posts/new")}><PlusIcon/></Button>
    </div>
  {/if}
</div>