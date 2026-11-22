<script lang="ts">
  import SystemHelp from "#lib/components/startup/SystemHelp.svelte";

  let username = $state("");
  let accessCode = $state("");
  let showSystemHelp = $state(false);

  function login(event: SubmitEvent) {
    event.preventDefault();
  }

  function openSystemHelp() {
    showSystemHelp = true;
  }
</script>

<div class="desktop">
  {#if showSystemHelp}
    <SystemHelp onBack={() => (showSystemHelp = false)} />
  {:else}
    <div class="window">
      <div class="title-bar">Afterlight System Login</div>

      <div class="window-main">
        <div class="content">
          <h2>Welcome, Investigator.</h2>
          <p>Please identify yourself.</p>

          <form onsubmit={login}>
            <label for="username">Username:</label>
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

<style>
  .desktop {
    min-height: 100dvh;
    background:
      url("/images/login-background.png") center / cover no-repeat,
      radial-gradient(#172b55, #040410);
    display: grid;
    place-items: center;
    padding: clamp(16px, 4vw, 48px);
    color: #111318;
  }

  .window {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: min(100%, 1120px);
    min-height: 34rem;
    background: #c0c0c0;
    border: 4px outset #ddd;
    padding: 3px;
  }

  .window-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
  }

  .title-bar {
    background: #10105e;
    color: white;
    font-size: 24px;
    padding: 10px;
  }

  .content {
    padding: clamp(20px, 3vw, 36px);
    font-size: 24px;
  }

  .brand-panel {
    display: grid;
    place-items: center;
    min-width: 0;
    padding: 24px;
  }

  .logo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h2 {
    font-weight: normal;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    background: #f2f1e9;
    border: 3px inset #ddd;
    padding: 10px;
    width: 100%;
  }

  button {
    background: #c0c0c0;
    border: 3px outset #ddd;
    padding: 10px;
  }

  button:active {
    border-style: inset;
  }

  .status {
    display: flex;
    border-top: 2px groove #ddd;
    padding: 10px;
    color: #215a39;
    font-size: 20px;
  }
  h3 {
    padding: 10px;
    color: #215a39;
    font-size: 20px;
  }

  @media (max-width: 700px) {
    .window {
      min-height: 0;
    }

    .window-main {
      grid-template-columns: minmax(0, 1fr);
    }

    .brand-panel {
      grid-row: 1;
      min-height: 11rem;
    }

    .logo {
      width: min(100%, 20rem);
    }
  }
</style>
