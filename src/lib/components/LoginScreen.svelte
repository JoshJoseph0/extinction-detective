<script lang="ts">
  import SystemHelp from "#lib/components/startup/SystemHelp.svelte";
  import Access from "#lib/components/startup/Access.svelte";

  let username = $state("");
  let accessCode = $state("");
  let showSystemHelp = $state(false);
  let showAccess = $state(false);

  function login(event: SubmitEvent) {
    event.preventDefault();
  }

  function openSystemHelp() {
    showSystemHelp = true;
  }

  function openAccess() {
    showAccess = true;
  }
</script>

<div class="desktop">
  {#if showSystemHelp}
    <SystemHelp onBack={() => (showSystemHelp = false)} />
  {:else if showAccess}
    <Access onBack={() => (showAccess = false)} />
  {:else}
    <div class="window">
      <div class="title-bar">Afterlight System Login</div>

      <div class="window-main">
        <div class="content">
          <h2>Welcome, Investigator.</h2>
          <p>Please identify yourself.</p>

          <form onsubmit={login}>
            <label for="username">Enter Afterlight Email:</label>
            <input
              id="username"
              bind:value={username}
              autocomplete="username"
              required
            />
            <label for="access-code">Access Code:</label>
            <input
              id="access-code"
              bind:value={accessCode}
              autocomplete="off"
              required
            />
            <div>
              <button type="submit">Log In</button>
              <button type="button" onclick={openSystemHelp}>System Help</button>
              <button type="button" onclick={openAccess}>Get Access</button>
            </div>
          </form>
        </div>
        <div class="brand-panel">
          <img
            class="logo"
            src="/images/afterlight-logo-transparent.png"
            alt="Afterlight logo"
          />
        </div>
      </div>

      <div class="status">
        <h3>System Status: ONLINE</h3>
        <h3>Research Net : CONNECTED</h3>
      </div>
    </div>
  {/if}
</div>
