<script>
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { LoaderCircleIcon } from "@lucide/svelte";
	import { toast } from "svelte-sonner";

  const { form } = $props();
  let isFormSubmitting = $state(false);

  $effect(() => {
    if (form?.message) {
      toast(form.message);
    }
  })
</script>
<div class="min-h-screen w-full flex flex-col items-center justify-center">
  <div class="w-full max-w-sm space-y-4">
    <div class="text-center mb-8">
      <h1 class="text-lg font-semibold">Welcome Back</h1>
      <p class="text-muted-foreground">To login, please enter your credentials</p>
  </div>
  <form method="post" action="?/login" class="space-y-4" use:enhance={() => {
    isFormSubmitting = true;
    return async ({update}) => {
      isFormSubmitting = false;
      update();
    }
  }}>
    <div class="grid grid-cols-1 gap-2">
      <Label for="username">Username</Label>
      <Input placeholder="Enter your username" name="username" id="username"/>
    </div>
    <div class="grid grid-cols-1 gap-2">
      <Label for="password">Password</Label>
      <Input placeholder="Enter your password" name="password" id="password"/>
    </div>
    <Button type="submit" class="w-full">
      {#if isFormSubmitting}
        <LoaderCircleIcon class="animate-spin"/>
        {:else}
        Login
      {/if}
    </Button>
  </form>
</div>
</div> 