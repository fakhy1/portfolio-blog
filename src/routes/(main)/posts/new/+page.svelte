<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { ImageIcon } from "@lucide/svelte";
	import { Textarea } from "$lib/components/ui/textarea";
	import { toast } from "svelte-sonner";
	import { onMount } from "svelte";

  const { data } = $props();
  
  onMount(() => {

    if (!data.auth.isAuthenticated) {
      goto("/", {replaceState: true});
    }
  })

  let postData = $state({
    title: "",
    slug: "",
    description: "",
    image: "",
  });

  $effect(() => {
    postData.slug = postData.title.toLowerCase().replace(/\s/g, "-");
  })

  const handlePostCreate = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });

    const {data, error} = await response.json() as { data: { slug: string }, error: string };
    if (error) return toast.error(error);
    goto(`/posts/${data.slug}`)
  }

</script>

<div class="flex flex-col min-h-96 gap-6 max-w-md mx-auto">
  {#if postData.image}
    <img src={postData.image} alt="post_image" class="aspect-video rounded-lg object-cover object-center">
    {:else}
  <div role="button" class="aspect-video border-2 border-dashed rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center cursor-pointer">
    <ImageIcon class="text-muted-foreground" size={20}/>
  </div>
  {/if}
  <div class="grid grid-cols-1 gap-2">
    <Label>Image Url</Label>
    <Input bind:value={postData.image} placeholder="Enter post image url"/>
  </div><div class="grid grid-cols-1 gap-2">
    <Label>Title</Label>
    <Input bind:value={postData.title} placeholder="Enter post title"/>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <Label>Slug</Label>
    <Input value={postData.slug} placeholder="Enter post slug"/>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <Label>Description</Label>
    <Textarea bind:value={postData.description} placeholder="Enter post description"/>
  </div>
  <Button class="self-end" onclick={handlePostCreate}>Create</Button>
</div>