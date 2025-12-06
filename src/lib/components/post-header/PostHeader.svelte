<script lang="ts">
	import UrlCopyButton from "$lib/components/UrlCopyButton.svelte";
	import PostBreadcrumb from "./PostBreadcrumb.svelte";
	import PostEditSheet from "./PostEditSheet.svelte";
	import PostStatusButton from "./PostStatusButton.svelte";

  let { post, hideEditButtons } = $props();

</script>

<header class="flex items-center justify-between mb-8">
  <PostBreadcrumb />
  <div class="flex items-center gap-1">
    <UrlCopyButton />
    <PostEditSheet post={post} hide={hideEditButtons}/>
    <PostStatusButton slug={post?.slug} isPublished={post?.isPublished} />
  </div>
</header>