<script lang="ts">
  let { onBack }: { onBack: () => void } = $props();
</script>

<main class="help-screen">
  <h1>Your login is...</h1>
  <button type="button" onclick={onBack}>Return to login</button>
</main>

<style>
  .help-screen {
    min-height: 100dvh;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 24px;
    color: #d4dbe9;
  }
</style>
