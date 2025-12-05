<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";

  const { Icon, title, description } = $props();
</script>

<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon" >
      <Icon />
    </Empty.Media>
    <Empty.Title>{title}</Empty.Title>
    <Empty.Description>{description}</Empty.Description>
  </Empty.Header>
</Empty.Root>