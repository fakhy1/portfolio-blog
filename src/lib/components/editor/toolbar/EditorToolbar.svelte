<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as ButtonGroup from "$lib/components/ui/button-group";
  import type { Editor } from "@tiptap/core";
  import { TableIcon } from "@lucide/svelte";
	import ImageButton from "./ImageButton.svelte";
	import TextStyleSelect from "./TextStyleSelect.svelte";
	import Marks from "./Marks.svelte";
	import TextAlign from "./Alignments.svelte";

  const { editor }: { editor: Editor } = $props();

</script>


<div class="bg-background fixed bottom-0 max-md:left-0 max-md:right-0 md:left-1/2 md:-translate-x-1/2 z-50 overflow-x-scroll">
  {#if editor}
  <ButtonGroup.Root  class="border border-b-0 rounded-t-md bg-accent/50 max-md:rounded-none md:rounded-b-none">
    <TextStyleSelect {editor} />
    <Marks {editor} />
    <ButtonGroup.Separator />
    <TextAlign {editor} />
    <ButtonGroup.Separator />
    <Button
      size="icon"
      variant={editor.isActive('table') ? "secondary" : "ghost"} onclick={() => editor.chain().focus().insertTable({cols: 2, rows: 2}).run()} >
      <TableIcon />
    </Button>
    <ImageButton {editor} />
  </ButtonGroup.Root>
  {/if}
</div>
