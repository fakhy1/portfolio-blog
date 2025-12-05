<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "@lucide/svelte";
	import type { Editor } from "@tiptap/core";

  const { editor }: { editor: Editor } = $props();

  const marks = [
    {
      name: 'Bold',
      icon: BoldIcon,
      isActive: () => editor.isActive('bold'),
      onClick: () => editor.chain().focus().toggleBold().run()
    },
    {
      name: 'Italic',
      icon: ItalicIcon,
      isActive: () => editor.isActive('italic'),
      onClick: () => editor.chain().focus().toggleItalic().run()
    },
    {
      name: 'Underline',
      icon: UnderlineIcon,
      isActive: () => editor.isActive('underline'),
      onClick: () => editor.chain().focus().toggleUnderline().run()
    },
    {
      name: 'Strikethrough',
      icon: StrikethroughIcon,
      isActive: () => editor.isActive('strike'),
      onClick: () => editor.chain().focus().toggleStrike().run()
    },
    {
      name: 'Code',
      icon: CodeIcon,
      isActive: () => editor.isActive('code'),
      onClick: () => editor.chain().focus().toggleCode().run()
    },
  ]

</script>
{#each marks as mark}
  <Button variant={mark.isActive() ? "secondary" : "ghost"} size="icon" onclick={mark.onClick}>
    <mark.icon />
  </Button>
{/each}