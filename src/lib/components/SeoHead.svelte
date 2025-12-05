<script lang="ts">
	import { PUBLIC_SITE_URL } from "$env/static/public";

  const { title, description, image, canonical, published, modified }: {
    title: string;
    description: string;
    image?: string;
    canonical: string;
    published?: string;
    modified?: string;
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="website">
  <meta property="og:description" content={description} />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  <meta property="og:url" content={canonical} />
  <link rel="canonical" href={canonical} />
  {#if published}
    <meta property="article:published_time" content={published} />
  {/if}
  {#if modified}
    <meta property="article:modified_time" content={modified} />
  {/if}
  <meta name="twitter:card" content="summary_large_image">
  <meta property="twitter:domain" content={PUBLIC_SITE_URL}>
  <meta property="twitter:url" content={canonical}>
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  {#if image}
    <meta name="twitter:image" content={image}>
  {/if}
</svelte:head>