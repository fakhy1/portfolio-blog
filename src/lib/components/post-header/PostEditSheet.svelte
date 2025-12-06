<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
	import { Input } from "$lib/components/ui/input";
	import { LoaderCircleIcon, SettingsIcon } from "@lucide/svelte";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { deletePost, updatePost } from "$lib/mutaters";
	import { writable } from "svelte/store";

  const { post, hide } = $props();

  let isDeleteDialogOpen = $state(false);
  let isDeletePending = $state(false);

  let isPostUpdating = writable(false);

  const updates = $state({
    title: post?.title,
    slug: post?.slug,
    description: post?.description,
    image: post?.image,
  });

</script>

{#if !hide}
<Sheet.Root>
  <Sheet.Trigger>
    <Button size="icon-sm" variant="ghost"><SettingsIcon /></Button>
  </Sheet.Trigger>
  <Sheet.Content class="w-auto md:w-full">
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
          <Input id="title" type="text" bind:value={updates.title} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="slug">Slug</Label>
          <Input id="slug" type="text" bind:value={updates.slug} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="description">Description</Label>
          <Textarea id="description" bind:value={updates.description} />
        </div>
        <div class="grid grid-cols-1 gap-2">
          <Label for="image">Image</Label>
          <Input id="image" type="text" bind:value={updates.image} />
        </div>
        <div class="flex justify-end">
          <Button
            class="w-20"
            disabled={$isPostUpdating}
            onclick={
              () => updatePost({ slug: post.slug, updates, isUpdating: isPostUpdating })
            }>
            {#if $isPostUpdating}
              <LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
            {:else}
              Update
            {/if}
          </Button>
        </div>
      </div>
    </div>
    <Sheet.Footer>
      <div class="flex flex-col bg-accent/20 rounded-md p-4 items-center justify-between">
        <div class="mb-2">
          <h5 class="text-sm font-medium mb-2">Danger Zone</h5>
          <p class="text-muted-foreground text-sm">Deleting this post will remove it from your blog and cannot be undone.</p>
        </div>
        <AlertDialog.Root bind:open={isDeleteDialogOpen}>
          <AlertDialog.Trigger class="w-full">
            <Button variant="destructive" class="w-full">Delete Post</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Delete Post</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to delete this post?
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action
                class="w-20"
                onclick={async () => {
                  isDeletePending = true;
                  await deletePost(post.slug)
                  isDeleteDialogOpen = false
                  isDeletePending = false;
                }}>
                {#if isDeletePending}
                  <LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
                {:else}
                  Delete
                {/if}
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
{/if}