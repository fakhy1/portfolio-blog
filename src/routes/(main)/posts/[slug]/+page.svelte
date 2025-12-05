<script lang="ts">
	import { format } from "date-fns";
	import type { PageProps } from "./$types";
	import { updatePostContent } from "$lib/mutaters";
	import Footer from "$lib/components/Footer.svelte";
	import Editor from "$lib/components/editor/Editor.svelte";
	import BlogPostHeader from "$lib/components/BlogPostHeader.svelte";
	import { PUBLIC_SITE_URL } from "$env/static/public";
	import SeoHead from "$lib/components/SeoHead.svelte";
  
  const { data }: PageProps = $props();
  const { params, post, enableEditor, auth } = $derived(data);

</script>

<SeoHead
  image={post?.image ?? ""}
  title={post?.title ?? "Not Found"}
  description={post?.description ?? "Not Found"}
  canonical={`${PUBLIC_SITE_URL}/posts/${params.slug}`}
  published={post?.createdAt.toISOString()}
  modified={post?.updatedAt.toISOString()}
/>

{#if post} 
  <BlogPostHeader
    slug={params.slug}
    isPublished={post.isPublished}
    isLogin={auth.isAuthenticated}
  />
  <div class="mx-auto w-full max-w-2xl min-h-screen space-y-12">
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold">{post.title}</h1>
        <p class="text text-muted-foreground">{post.description}</p>
        <p class="text-sm text-muted-foreground">{format(post.createdAt, 'MMM dd, yyyy')}</p>
      </div>
      <img class="aspect-video object-cover rounded-md w-full" src={post.image} alt={post.title}>
    </div>
    <Editor 
      {enableEditor}
      onUpdate={(html: string) => updatePostContent(params.slug, html)}
      content={post?.content}
    />
  </div>
  <Footer />
{:else}
  <div class="flex items-center justify-center ">
    <p>Post not found</p>
  </div>
{/if}