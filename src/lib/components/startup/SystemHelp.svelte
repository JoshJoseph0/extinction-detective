<script lang="ts">
  let { onBack }: { onBack: () => void } = $props();
</script>

<main class="help-screen">
  <h1>System Help</h1>
  <button type="button" onclick={onBack}>Return to login</button>
</main>
