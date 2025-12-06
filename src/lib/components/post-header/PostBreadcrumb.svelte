<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import { HomeIcon } from "@lucide/svelte";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">
        <Breadcrumb.Page><HomeIcon class="size-4" /></Breadcrumb.Page>
      </Breadcrumb.Link>
    </Breadcrumb.Item>
      <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Blog</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>