<script lang="ts">
  let {
    userNumber,
    companyEmail,
    accessCode,
    onBack,
  }: {
    userNumber: string;
    companyEmail: string;
    accessCode: string;
    onBack: () => void;
  } = $props();

  let copied = $state(false);
  let copyError = $state("");

  async function copyCredentials() {
    copied = false;
    copyError = "";

    try {
      await navigator.clipboard.writeText(
        `Email: ${companyEmail}\nAccess Code: ${accessCode}`
      );
      copied = true;
    } catch (error) {
      console.error("Could not copy credentials.", error);
      copyError = "Could not copy credentials. Please copy them manually.";
    }
  }
</script>

<main class="help-screen">
  <section class="receipt">
    <h1>Registration Successful</h1>
    <p>Investigator Number: {userNumber}</p>
    <p>Afterlight Email: {companyEmail}</p>
    <p>Access Code: {accessCode}</p>
    <p>Please save these credentials securely.</p>

    <button type="button" onclick={copyCredentials}>
      {copied ? "Copied!" : "Copy Credentials"}
    </button>
    {#if copyError}
      <p class="error" role="alert">{copyError}</p>
    {/if}

    <button type="button" onclick={onBack}>Return to Login</button>
  </section>
</main>

<style>
  .help-screen {
    min-height: 100dvh;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 16px;
    padding: 24px;
    color: #d4dbe9;
    text-align: center;
  }

  .receipt {
    width: min(100%, 38rem);
    padding: 24px;
    background: #c0c0c0;
    border: 4px outset #ddd;
    color: #111318;
  }

  h1 {
    margin: -24px -24px 20px;
    padding: 12px;
    background: #10105e;
    color: white;
    font-size: 24px;
    font-weight: normal;
  }

  p {
    overflow-wrap: anywhere;
  }

  button {
    margin: 8px;
    padding: 10px 16px;
    background: #c0c0c0;
    border: 3px outset #ddd;
  }

  button:active {
    border-style: inset;
  }

  .error {
    color: #721212;
  }
</style>
