<script lang="ts">
  import GetAccess from "../GetAccess.svelte";

  type Registration = {
    userNumber: string;
    companyEmail: string;
    accessCode: string;
  };

  let useremail = $state("");
  let registration = $state<Registration | null>(null);
  let errorMessage = $state("");
  let isSubmitting = $state(false);
  let { onBack }: { onBack: () => void } = $props();

  function isRegistration(value: unknown): value is Registration {
    return (
      typeof value === "object" &&
      value !== null &&
      "userNumber" in value &&
      typeof value.userNumber === "string" &&
      "companyEmail" in value &&
      typeof value.companyEmail === "string" &&
      "accessCode" in value &&
      typeof value.accessCode === "string"
    );
  }

  function getErrorMessage(value: unknown): string | undefined {
    if (
      typeof value === "object" &&
      value !== null &&
      "error" in value &&
      typeof value.error === "string"
    ) {
      return value.error;
    }
  }

  async function register(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = "";
    isSubmitting = true;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: useremail }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        errorMessage = getErrorMessage(data) ?? "Registration failed.";
        return;
      }

      if (!isRegistration(data)) {
        errorMessage = "The server returned incomplete registration details.";
        return;
      }

      registration = data;
    } catch (error) {
      console.error("Registration request failed.", error);
      errorMessage = "Could not complete registration. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if registration}
  <GetAccess
    userNumber={registration.userNumber}
    companyEmail={registration.companyEmail}
    accessCode={registration.accessCode}
    {onBack}
  />
{:else}
  <div class="desktop">
    <div class="window">
      <div class="title-bar">Afterlight Sign Up System</div>

      <div class="window-main">
        <div class="content">
          <h2>Welcome, New Investigator.</h2>
          <p>Please identify yourself.</p>

          <form onsubmit={register}>
            <label for="useremail">Enter your real email:</label>
            <input
              id="useremail"
              type="email"
              bind:value={useremail}
              autocomplete="email"
              required
            />

            {#if errorMessage}
              <p class="error" role="alert">{errorMessage}</p>
            {/if}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get Access"}
            </button>
          </form>

          <button type="button" onclick={onBack}>Return to login</button>
        </div>
      </div>

      <div class="status">
        <h3>System Status: ONLINE</h3>
        <h3>Research Net: CONNECTED</h3>
      </div>
    </div>
  </div>
{/if}

<style>
  .desktop {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding: clamp(16px, 4vw, 48px);
    background:
      url("/images/login-background.png") center / cover no-repeat,
      radial-gradient(#172b55, #040410);
    color: #111318;
  }

  .window {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: min(100%, 800px);
    background: #c0c0c0;
    border: 4px outset #ddd;
    padding: 3px;
  }

  .window-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .title-bar {
    background: #10105e;
    color: white;
    font-size: 24px;
    padding: 10px;
  }

  .content {
    padding: clamp(20px, 3vw, 36px);
    font-size: 20px;
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

  .error {
    margin: 0;
    padding: 10px;
    border: 2px solid #9c1c1c;
    background: #fff0f0;
    color: #721212;
    font-size: 16px;
  }

  button {
    margin-top: 12px;
    padding: 10px 16px;
    background: #c0c0c0;
    border: 3px outset #ddd;
  }

  button:active {
    border-style: inset;
  }

  .status {
    display: flex;
    border-top: 2px groove #ddd;
    padding: 10px;
    color: #215a39;
  }

  h3 {
    padding: 10px;
    font-size: 16px;
  }
</style>
