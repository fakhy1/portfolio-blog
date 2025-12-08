<script lang="ts">
  import { SettingsIcon } from "@lucide/svelte";
import { Button } from "./ui/button";
	import { goto } from "$app/navigation";
</script>

<div class="sticky p-2 w-full h-12 z-50 top-0 left-0 flex items-center justify-between bg-secondary/80 border-b">
  <h5 class="font-semibold">Admin</h5>
  <div class="flex items-center gap-2">
    <Button size="sm" onclick={() => goto('/logout')}>Logout</Button>
    <Button size="icon-sm" variant="outline"><SettingsIcon /></Button>
  </div>
</div>