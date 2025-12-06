<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
	import { Input } from "$lib/components/ui/input";
	import { SettingsIcon } from "@lucide/svelte";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import Button from "$lib/components/ui/button/button.svelte";

  const {post, hide} = $props()
</script>

{#if !hide}
<Sheet.Root>
  <Sheet.Trigger>
    <Button size="icon-sm" variant="ghost"><SettingsIcon /></Button>
  </Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header class="gap-0">
      <Sheet.Title>Settings</Sheet.Title>
      <Sheet.Description>
        Edit your post
      </Sheet.Description>
    </Sheet.Header>
    <div class="p-4 space-y-10">
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-2">
          <Label for="title">Title</Label>
          <Input id="title" type="text" value={post?.title} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="slug">Slug</Label>
          <Input id="slug" type="text" value={post?.slug} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="description">Description</Label>
          <Textarea id="description" value={post?.description} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="image">Image</Label>
          <Input id="image" type="text" value={post?.image} />
        </div>
        <div class="flex justify-end">
          <Button>Update</Button>
        </div>
      </div>
    </div>
    <Sheet.Footer>
      <div class="flex flex-col bg-accent/20 rounded-md p-4 items-center justify-between">
        <div class="mb-2">
          <h5 class="text-sm font-medium mb-2">Danger Zone</h5>
          <p class="text-muted-foreground text-sm">Deleting this post will remove it from your account and cannot be undone.</p>
        </div>
        <Button variant="destructive" class="w-full">Delete Post</Button>
      </div>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
{/if}