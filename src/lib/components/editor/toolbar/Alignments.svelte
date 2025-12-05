<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from "@lucide/svelte";
	import type { Editor } from "@tiptap/core";

	const { editor }: { editor: Editor } = $props();

  const alignments = [
    {
      name: 'Left',
      icon: AlignLeftIcon,
      isActive: () => editor.isActive('textAlign', { textAlign: 'left' }),
      onClick: () => editor.chain().focus().setTextAlign('left').run()
    },
    {
      name: 'Center',
      icon: AlignCenterIcon,
      isActive: () => editor.isActive('textAlign', { textAlign: 'center' }),
      onClick: () => editor.chain().focus().setTextAlign('center').run()
    },
    {
      name: 'Right',
      icon: AlignRightIcon,
      isActive: () => editor.isActive('textAlign', { textAlign: 'right' }),
      onClick: () => editor.chain().focus().setTextAlign('right').run()
    },
  ]

</script>
{#each alignments as alignment}
  <Button variant={alignment.isActive() ? "secondary" : "ghost"} size="icon" onclick={alignment.onClick}>
    <alignment.icon />
  </Button>
{/each}