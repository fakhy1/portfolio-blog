<script lang="ts">
	import { format } from "date-fns";
	import Footer from "$lib/components/Footer.svelte";
	import { PUBLIC_SITE_URL } from "$env/static/public";
	import MainHeader from "$lib/components/MainHeader.svelte";
	import { goto } from "$app/navigation";
	import SeoHead from "$lib/components/SeoHead.svelte";

  const { data } = $props();
  let postsType = $state(data.postType);
  
  $effect(() => {
    postsType === 'published'
      ? goto('/')
      : goto(`?type=${postsType}`);
  })

</script>

<SeoHead
  title="Posts | Blog"
  description="Blog Posts"
  canonical={`${PUBLIC_SITE_URL}/`}
/>

<div class="mx-auto w-full max-w-2xl min-h-screen mb-8">
    <MainHeader isAuthenticated={data.auth.isAuthenticated} bind:postsType={postsType}/>
    <div class="w-full flex flex-col gap-2 mt-10">
      {#if data.posts.length}
        {#each data.posts as post}
        <div class="relative mb-6 w-full rounded-md group space-y-1 group">
          <a href={`/posts/${post.slug}`} class="group-hover:underline group-hover:cursor-pointer font-medium">{post.title}</a>
          <p class="text-muted-foreground">{post.description}</p>
          <p class="text-muted-foreground text-sm">{format(post.createdAt, "MMM dd, yyyy")}</p>
        </div>
        {/each}
      {:else}
        <p class="text-muted-foreground text-center mt-8">No posts yet.</p>
      {/if}
    </div>
</div>
<Footer />
