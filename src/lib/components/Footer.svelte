<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
 
  import { mode, setMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>
 
<footer class="flex items-center justify-between max-w-2xl mx-auto py-2 border-t p-4">
  <p class="text-sm text-muted-foreground">© 2025 Fakhy.</p>
  <div>
    <Button class="size-7" onclick={() => setMode("light")} variant={mode.current === "light" ? "secondary" : "ghost"} size="icon">
      <SunIcon/>
      <span class="sr-only">Toggle theme</span>
    </Button>
    <Button class="size-7" onclick={() => setMode("dark")} variant={mode.current === "dark" ? "secondary" : "ghost"} size="icon">
      <MoonIcon/>
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</footer>