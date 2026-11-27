<script>
  import { onMount } from "svelte";
  import BootSequence from "#lib/components/startup/BootSequence.svelte";

  import LoginScreen from "#lib/components/LoginScreen.svelte";

  let bootComplete = $state(false);
  let loginVisible = $state(false);

  onMount(() => {
    const welcome = new Audio("/audio/bootaudio/Welcome Investigator.mp3");
    welcome.preload = "auto";
    let played = false;
    let pending = false;
    let disposed = false;

    function removePlaybackListeners() {
      window.removeEventListener("pointerdown", playWelcome, true);
      window.removeEventListener("keydown", playWelcome, true);
    }

    async function playWelcome() {
      if (played || pending || disposed) return;
      pending = true;
      try {
        await welcome.play();
        if (disposed) {
          welcome.pause();
          return;
        }
        played = true;
        removePlaybackListeners();
      } catch {
        // Browsers may require a user gesture before allowing sound.
      } finally {
        pending = false;
      }
    }

    window.addEventListener("pointerdown", playWelcome, true);
    window.addEventListener("keydown", playWelcome, true);
    void playWelcome();

    return () => {
      disposed = true;
      removePlaybackListeners();
      welcome.pause();
      welcome.removeAttribute("src");
      welcome.load();
    };
  });
</script>

{#if loginVisible}
  <div class="login-reveal" class:transitioning={!bootComplete}>
    <LoginScreen />
  </div>
{/if}

{#if !bootComplete}
  <BootSequence
    onEnter={() => (loginVisible = true)}
    onComplete={() => (bootComplete = true)}
  />
{/if}

<style>
  .login-reveal {
    animation: enter-computer 1.6s cubic-bezier(0.45, 0, 0.2, 1) both;
  }

  .login-reveal.transitioning {
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  @keyframes enter-computer {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .login-reveal { animation: none; }
  }
</style>
