<script lang="ts">
	import * as Select from "$lib/components/ui/select";
	import { CodeIcon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, ListIcon, ListOrderedIcon, QuoteIcon, TextIcon } from "@lucide/svelte";
	import type { Editor } from "@tiptap/core";

  const { editor }: {editor: Editor} = $props();

  let value = $state('p');

  const styles = [
    {
      label: "Paragraph",
      value: 'paragraph',
      icon: TextIcon,
      command: () => editor.chain().focus().setParagraph().run()
    },
    {
      label: 'Heading 2',
      value: 'h2',
      icon: Heading2Icon,
      isActive: () => editor.isActive('heading', { level: 2 }),
      command: () => editor.chain().focus().setHeading({level: 2}).run()

    },
    {
      label: 'Heading 3',
      value: 'h3',
      icon: Heading3Icon,
      isActive: () => editor.isActive('heading', { level: 3 }),
      command: () => editor.chain().focus().setHeading({level: 3}).run()
    },
    {
      label: 'Heading 4',
      value: 'h4',
      icon: Heading4Icon,
      isActive: () => editor.isActive('heading', { level: 4 }),
      command: () => editor.chain().focus().setHeading({level: 4}).run()
    },
    {
      label: 'Heading 5',
      value: 'h5',
      icon: Heading5Icon,
      isActive: () => editor.isActive('heading', { level: 5 }),
      command: () => editor.chain().focus().setHeading({level: 5}).run()
    },
    {
      label: 'Bullet List',
      value: 'listItem',
      icon: ListIcon,
      isActive: () => editor.isActive('bulletList'),
      command: () => editor.chain().focus().toggleBulletList().run()
    },
    {
      label: 'Numbered List',
      value: 'ordered-list',
      icon: ListOrderedIcon,
      isActive: () => editor.isActive('orderedList'),
      command: () => editor.chain().focus().toggleOrderedList().run()
    },
    {
      label: 'Code Block',
      value: 'codeBlock',
      icon: CodeIcon,
      isActive: () => editor.isActive('codeBlock'),
      command: () => editor.chain().focus().setCodeBlock().run()
    },
    {
      label: 'Block Quote',
      value: 'blockquote',
      icon: QuoteIcon,
      isActive: () => editor.isActive('quote'),
      command: () => editor.chain().focus().setBlockquote().run()
    }
  ]

  let selectLabel = $derived(styles.find(style => style.value === value)?.label)

  const handleValueChange = (value: string) => {
    const style = styles.find(s => s.value === value);
    console.log(style);
    style?.command();
  }

  $effect(() => {
    const state = editor.view.state;
    const from = state.selection.from;
    const pos = state.doc.resolve(from);

    const currentType = pos.node().type;
    const parentType = pos.node(pos.depth - 1).type;

    if (parentType.name === 'blockquote') {
      value = 'blockquote';
    } else if (parentType.name === 'listItem') {
      value = 'listItem';
    } else if (currentType.name === 'paragraph') {
      value = 'paragraph';
    } else if (currentType.name === 'heading') {
      value = 'h' + editor.getAttributes(currentType).level;
    } else if (currentType.name === 'codeBlock') {
      value = 'codeBlock';
    } else {
      selectLabel = "Turn into"
    }

  })

</script>

<Select.Root bind:value onValueChange={handleValueChange} type="single">
  <Select.SelectTrigger class="border-none max-md:rounded-none md:rounded-b-none">
    {selectLabel}
  </Select.SelectTrigger>
  <Select.SelectContent>
    {#each styles as style}
      <Select.SelectItem value={style.value}>
        <style.icon /> {style.label}
      </Select.SelectItem>
    {/each}
  </Select.SelectContent>
</Select.Root>