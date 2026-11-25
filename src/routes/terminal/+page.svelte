<script lang="ts">
  import type { PageData } from "./$types";
  import { authClient } from "../../lib/auth-client";
  import { goto } from "$app/navigation";

  async function logout() {
    const { error } = await authClient.signOut();

    if (!error) {
      await goto("/");
    }
  }
  let { data }: { data: PageData } = $props();
</script>

<main class="terminal">
  <h1>AFTERLIGHT SYSTEMS</h1>

  <p>Authentication successful.</p>

  <h2>Welcome, {data.userNumber}.</h2>

  <p>Email: {data.email}</p>

  <p>Session status: ACTIVE</p>
  <button onclick={logout}> Sign Out </button>
</main>

<style>
  .terminal {
    min-height: 100dvh;
    background: #080d0b;
    color: #8ccf9c;
    font-family: "VT323", monospace;
    font-size: 26px;
    padding: 40px;
  }

  h1,
  h2 {
    font-weight: normal;
  }
</style>
