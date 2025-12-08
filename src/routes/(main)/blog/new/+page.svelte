<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { ImageIcon } from "@lucide/svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { toast } from "svelte-sonner";
  import { onMount } from "svelte";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  const { data } = $props();

  onMount(() => {
    if (!data.auth.isAuthenticated) {
      goto("/", { replaceState: true });
    }
  });

  let postData = $state({
    title: "",
    slug: "",
    description: "",
    image: ""
  });

  $effect(() => {
    postData.slug = postData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  const handlePostCreate = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });

    const { data, error } = (await response.json()) as {
      data: { slug: string };
      error: string;
    };

    if (error) return toast.error(error);
    goto(`/blog/${data.slug}`);
  };

  let isDialogOpen = $state(false);
  const handleImageSet = (image: string) => {
    postData.image = image;
    isDialogOpen = false;
  };

</script>

<SeoHead
  title="New - Blog"
  description="Create new blog post"
/>

<div class="flex flex-col min-h-96 gap-6 max-w-md mx-auto">
  
  <!-- Image dialog -->
  <Dialog.Root open={isDialogOpen} onOpenChange={(open) => isDialogOpen = open}>
    <Dialog.Trigger>
      {#if postData.image}
        <img
          src={postData.image}
          alt="post_image"
          class="aspect-video w-full h-full rounded-lg object-cover object-center cursor-pointer"
        />
      {:else}
        <div
          role="button"
          class="aspect-video border-2 border-dashed rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center cursor-pointer"
        >
          <ImageIcon class="text-muted-foreground" size={20} />
        </div>
      {/if}
    </Dialog.Trigger>

    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Post Image</Dialog.Title>
        <Dialog.Description>Set post image.</Dialog.Description>
      </Dialog.Header>

      <div class="grid grid-cols-1 gap-2">
        <Input
          placeholder="Enter post image url"
          value={postData.image}
          onkeydown={(e) => {
            if (e.key === "Enter") {
              handleImageSet(e.currentTarget.value);
            }
          }}
        />
      </div>

      <Dialog.Footer>
        <Button
          onclick={() => {
            const input = document.querySelector("input");
            if (input) handleImageSet(input.value);
          }}
        >
          Save
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <!-- Title -->
  <div class="grid grid-cols-1 gap-2">
    <Label>Title</Label>
    <Input bind:value={postData.title} placeholder="Enter post title" />
  </div>

  <!-- Slug -->
  <div class="grid grid-cols-1 gap-2">
    <Label>Slug</Label>
    <Input bind:value={postData.slug} placeholder="Enter post slug" />
  </div>

  <!-- Description -->
  <div class="grid grid-cols-1 gap-2">
    <Label>Description</Label>
    <Textarea
      bind:value={postData.description}
      placeholder="Enter post description"
    />
  </div>

  <Button class="self-end" onclick={handlePostCreate}>Create</Button>
</div>
