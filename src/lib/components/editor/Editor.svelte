<script lang="ts">
  import { Editor } from "@tiptap/core";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import TextAlign from "@tiptap/extension-text-align";
  import Image from '@tiptap/extension-image'
  import { Markdown } from '@tiptap/markdown'
  import { TableKit } from '@tiptap/extension-table'
  import { StarterKit } from "@tiptap/starter-kit";
  import { onDestroy, onMount } from "svelte";
	import { EditorToolbar } from "./toolbar";

  const { content, onUpdate, enableEditor} = $props();

  let element: Element | undefined = $state();
  let bubbleMenu: HTMLElement | undefined = $state();
  let editorState: { editor: Editor | null } = $state({ editor: null });

  onMount(() => {
    editorState.editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        TableKit.configure({
          table: {
            resizable: true
          }
        }),
        Image,
        Markdown,
        BubbleMenu.configure({
          element: bubbleMenu,
        }),
      ],
      editable: enableEditor,
      content: content,
      contentType: "json",
      onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
      onTransaction: ({ editor }) => {
        // Increment the state signal to force a re-render
        editorState = { editor };
      },
    });
  });

  onDestroy(() => {
    editorState.editor?.destroy();
  });
</script>

<div class="w-full grid grid-cols-1">
  {#if (editorState.editor && enableEditor)}
    <EditorToolbar editor={editorState.editor}/>
  {/if}
  <div class="typography" bind:this={element}></div>
</div>