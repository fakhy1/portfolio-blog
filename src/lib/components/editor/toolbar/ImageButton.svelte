<script>
	import { ImageIcon } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
  import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";

  const {editor} = $props();

  let imageDialogOpen = $state(false);

  let image = $state({
    alt: "",
    url: "",
  });

  const handleOpenDialog = () => {
    const attrs = editor.getAttributes("image");

    image = {
      alt: attrs.alt ?? "",
      url: attrs.src ?? "",
    };

    imageDialogOpen = true;
  };

  const handleAddImage = () => {
    if (!image.url) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: image.url,
        alt: image.alt || undefined,
      })
      .run();

    image = { alt: "", url: ""};
    imageDialogOpen = false;
  };

</script>

<Button
  size="icon"
  variant={editor.isActive('image') ? "secondary" : "ghost"} onclick={handleOpenDialog} >
  <ImageIcon />
</Button>

<Dialog.Root open={imageDialogOpen} onOpenChange={(open) => (imageDialogOpen = open)}>
  <Dialog.DialogContent>
    <div class="grid grid-cols-1 gap-2">
      <Label>Image Url</Label>
      <Input bind:value={image.url} />
    </div>

    <div class="grid grid-cols-1 gap-2">
      <Label>Alt Text</Label>
      <Input bind:value={image.alt} />
    </div>

    <Dialog.DialogFooter>
      <Dialog.DialogClose>
        <Button variant="ghost">Cancel</Button>
      </Dialog.DialogClose>
      <Button onclick={handleAddImage}>Insert</Button>
    </Dialog.DialogFooter>
  </Dialog.DialogContent>
</Dialog.Root>