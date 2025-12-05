<script lang="ts">
	import { toast } from "svelte-sonner";
	import Button from "./ui/button/button.svelte";
	import { CheckIcon, ChevronLeftIcon, EllipsisVerticalIcon, FolderClosedIcon, LinkIcon, Trash2Icon } from "@lucide/svelte";
	import * as DropdownMenu from "./ui/dropdown-menu";
	import { deletePost, updatePostStatus } from "$lib/mutaters";

  let isCopied = $state(false);
  let { slug, isPublished, isLogin } = $props();

  const handleCopyUrl = () => {
    window.navigator.clipboard.writeText(window.location.href);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
    toast.success("Url copied to clipboard");
  }
</script>

<header class="flex items-center justify-between mb-8">
  <Button variant="secondary" onclick={() => window.history.back()}><ChevronLeftIcon /> Back</Button>
  <div class="flex items-center gap-1">
    <Button size="icon-sm" variant="ghost" onclick={handleCopyUrl}>
      {#if isCopied}
      <CheckIcon class="text-green-500"/>
      {:else}
      <LinkIcon />
    {/if}
    </Button>
  {#if isLogin}
    <div class="flex items-center gap-1">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="secondary" size="icon-sm"><EllipsisVerticalIcon/></Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class='w-48'>
          <DropdownMenu.Item onclick={() => deletePost(slug)}><Trash2Icon /> Delete</DropdownMenu.Item>
          <DropdownMenu.Item onclick={isPublished ? () => updatePostStatus({status: "draft", slug}) : () => updatePostStatus({status: "publish", slug})}> 
            {#if isPublished}
              <FolderClosedIcon/> Draft
            {:else}
              <CheckIcon/> Publish
            {/if}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  {/if}
  </div>
</header>