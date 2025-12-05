<script lang="ts">
  import { goto } from "$app/navigation";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import { EllipsisVerticalIcon } from "@lucide/svelte";

  let { isAuthenticated, postsType = $bindable() } = $props();

</script>

<div class="flex items-center justify-between mb-4">
  <div>
    <h5 class="font-medium">Fakhy</h5>
    <p class="text-muted-foreground">Researcher</p>
  </div>
  {#if isAuthenticated}
    <div class="flex items-center gap-1">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button variant="secondary" size="icon-sm"><EllipsisVerticalIcon/></Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class='w-48'>
          <DropdownMenu.Item onclick={() => goto("/posts/new")}>New Post</DropdownMenu.Item>
          <DropdownMenu.Separator/>
          <DropdownMenu.Group>
            <DropdownMenu.Label class="text-muted-foreground font-medium">Post Type</DropdownMenu.Label>
            <DropdownMenu.RadioGroup bind:value={postsType}>
              <DropdownMenu.RadioItem value="draft">Draft</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="published">Published</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Group>
          <DropdownMenu.Separator/>
          <DropdownMenu.Item onclick={() => goto("/settings")}>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator/>
          <DropdownMenu.Item onclick={() => goto("/logout")}>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  {/if}
</div>