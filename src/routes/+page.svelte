<script>
  import BootSequence from "#lib/components/startup/BootSequence.svelte";

  import LoginScreen from "#lib/components/LoginScreen.svelte";

  let bootComplete = $state(false);
</script>

{#if bootComplete}
  <LoginScreen />
{:else}
  <BootSequence onComplete={() => (bootComplete = true)} />
{/if}
