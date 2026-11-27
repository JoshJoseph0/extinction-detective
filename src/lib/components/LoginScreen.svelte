<script lang="ts">
  import { goto } from "$app/navigation";
  import SystemHelp from "./startup/SystemHelp.svelte";
  import Access from "./startup/Access.svelte";
  import { authClient } from "../auth-client";
  import AfterlightAnimation from "./AfterlightAnimation.svelte";
  let username = $state("");
  let accessCode = $state("");
  let showSystemHelp = $state(false);
  let showAccess = $state(false);
  let errorMessage = $state("");
  let loading = $state(false);
  let emailFocused = $state(false);
  const mascotAnimation = $derived(
    loading ? "thinking" : errorMessage ? "thumbs-down" : emailFocused ? "searching" : "idle"
  );
  const mascotDescription = $derived(
    loading ? "Mr Planet checking your credentials" : errorMessage ? "Mr Planet giving a thumbs down" : emailFocused ? "Mr Planet looking around" : "Mr Planet waiting to welcome you"
  );

  async function login(event: SubmitEvent) {
    event.preventDefault();

    loading = true;
    errorMessage = "";

    try {
      const { data, error } = await authClient.signIn.email({
        email: username.trim().toLowerCase(),
        password: accessCode.trim(),
      });

      if (error) {
        errorMessage = "Invalid email or access code";
        return;
      }

      await goto("/terminal");
    } catch {
      errorMessage = "Unable to connect to Afterlight";
    } finally {
      loading = false;
    }
  }
  function openSystemHelp() {
    showSystemHelp = true;
  }

  function openAccess() {
    showAccess = true;
  }
</script>

<div class="desktop">
  <div class="login-static" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>
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
              onfocus={() => (emailFocused = true)}
              onblur={() => (emailFocused = false)}
              oninput={() => (errorMessage = "")}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={errorMessage ? "login-error" : undefined}
              required
            />

            <label for="access-code">Access Code:</label>
            <input
              id="access-code"
              bind:value={accessCode}
              autocomplete="off"
              oninput={() => (errorMessage = "")}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={errorMessage ? "login-error" : undefined}
              required
            />
            {#if errorMessage}
              <p id="login-error" class="login-error" role="alert">{errorMessage}</p>
            {/if}
            <div>
              <button type="submit" disabled={loading}>
                {loading ? "Authenticating..." : "Log In"}
              </button>
              <button type="button" onclick={openSystemHelp}>System Help</button
              >
              <button type="button" onclick={openAccess}>Get Access</button>
            </div>
          </form>
        </div>
        <div class="brand-panel">
          <div class="login-mascot">
            <AfterlightAnimation
              name={mascotAnimation}
              alt={mascotDescription}
              width="100%"
            />
          </div>
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
    position: relative;
    isolation: isolate;
    min-height: 100dvh;
    display: grid;

    place-items: center;
    padding: clamp(16px, 4vw, 48px);
    color: #111318;
  }

  .login-static {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }

  .login-static span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    opacity: 0.16;
    background: linear-gradient(
      to right,
      transparent,
      #83c9a5 25%,
      #c3e3cf 55%,
      transparent
    );
    animation: static-drift 12s linear infinite;
  }

  .login-static span::after {
    content: "";
    position: absolute;
    inset: -5px 0;
    background: url("/images/tv-static.svg") repeat;
    opacity: 0.3;
  }

  .login-static span:nth-child(2) {
    animation-delay: -4s;
    opacity: 0.09;
  }

  .login-static span:nth-child(3) {
    animation-delay: -8s;
    opacity: 0.12;
  }

  @keyframes static-drift {
    from { transform: translateY(-10vh); }
    to { transform: translateY(110vh); }
  }

  @media (prefers-reduced-motion: reduce) {
    .login-static { display: none; }
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
    place-content: center;
    justify-items: center;
    gap: 16px;
    min-width: 0;
    padding: 24px;
  }

  .login-mascot {
    width: min(100%, 340px);
    aspect-ratio: 880 / 680;
    line-height: 0;
  }

  .login-error {
    margin: 0;
    padding: 10px;
    border: 2px solid #9c1c1c;
    background: #fff0f0;
    color: #721212;
    font-size: 20px;
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

    .login-mascot {
      width: min(100%, 180px);
    }
  }
</style>
