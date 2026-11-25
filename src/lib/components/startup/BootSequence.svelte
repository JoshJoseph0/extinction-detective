<script lang="ts">
  //this file is the boot sequence component,
  // it handles the boot sequence of the application,
  // including the bios screen, loading screen, and glitch screen.
  // It uses gsap for animations and has a skip button to skip the boot sequence.
  // The component takes an onComplete prop which is called when the boot sequence is complete.
  //what it needs to do
  //when loading load all of the tech stacks/assets ext
  //importing gsap for animations and onDestroy for cleanup
  import { gsap } from "gsap";
  import { onDestroy } from "svelte";

  //defining props for the component, seems to be working well, dont chnnge for the moment
  let { onComplete }: { onComplete: () => void } = $props();

  let stage = $state("off");
  let progress = $state(0);
  let visibleLines = $state(0);

let started = false;

  async function startApp() {
    try {
      await document.documentElement.requestFullscreen();
      started = true;
    } catch (error) {
      // Still allow the app to start
      started = true;
    }
  }

  async function powerOn() {
    await startApp();
    startBoot();
  }

  let timeline: ReturnType<typeof gsap.timeline> | undefined;
  function finishBoot() {
    stage = "complete";
    onComplete();
  }

  //boot messages to be displayed during the boot sequence, not final yet
  const bootMessages = [
    "Checking system ........ OK",
    "Loading case archives ... OK",
    "Connecting to network ... OK",
    "Checking signal receiver ... OK",
    "Restoring investigator tools ... OK",
    "Starting workstation ...",
  ];
  //function to start the boot sequence, checks if the stage is off and if the user prefers reduced motion, then creates a gsap timeline for the boot sequence
  function startBoot() {
    if (stage !== "off") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishBoot();
      return;
    }
    //setting the stage to bios and creating a gsap timeline for the boot sequence, with callbacks to update the visible lines and progress, and changing the stage to loading and glitch at appropriate times
    stage = "bios";

    const bootTimeline = gsap.timeline({
      paused: true,
      onComplete: finishBoot,
    });
    timeline = bootTimeline;

    bootMessages.forEach((message, i) => {
      bootTimeline.call(
        () => {
          visibleLines = i + 1;
        },
        [],
        0.5 + i * 0.45,
      );
    });

    bootTimeline.call(
      () => {
        stage = "loading";
      },
      [],
      3.5,
    );

    const counter = { value: 0 };
    //ananamtion takes 3.5 secs
    bootTimeline.to(
      counter,
      {
        value: 100,
        duration: 3.5,
        ease: "none",
        onUpdate: () => {
          progress = Math.round(counter.value);
        },
      },
      3.5,
    );

    bootTimeline.call(
      () => {
        stage = "glitch";
      },
      [],
      7,
    );

    bootTimeline.call(() => {}, [], 7.5);

    bootTimeline.play();
  }

  onDestroy(() => {
    timeline?.kill();
  });
</script>

{#if stage === "off"}
  <div class="power-screen">
    <img
      id="logo-on-power"
      src="/images/afterlight-wordmark-cream.svg"
      alt="Afterlight Systems"
    />

    <button onclick={powerOn}> POWER ON </button>
  </div>
{:else if stage === "glitch"}
  <div class="glitch-screen"></div>
{:else if stage === "complete"}
  <!-- Boot sequence finished; render no overlay over the login screen. -->
{:else}
  <div class="bios" class:crt={stage === "bios"}>
    <h1>AFTERLIGHT SYSTEMS v1.04</h1>

    <p>Your Space • Our Research</p>

    <div class="messages">
      {#each bootMessages.slice(0, visibleLines) as message}
        <p>&gt; {message}</p>
      {/each}
    </div>

    {#if stage === "loading"}
      <p>Loading Afterlight System... {progress}%</p>

      <div class="loading-container">
        <div class="progress-bar">
          {#each Array(20) as _, i}
            <span class:filled={progress >= (i + 1) * 5}></span>
          {/each}
        </div>

        <img
          class="mascot"
          src="/images/mr-planet.svg"
          alt="Mr Planet loading"
        />
      </div>
    {/if}
  </div>
{/if}
<<<<<<< Updated upstream
=======

<style>
  .bios {
    min-height: 100dvh;
    padding: 70px 76px;
    background: #080a9a;
    color: #d4dbe9;
    font-size: 24px;
  }

  h1 {
    font-size: 28px;
    font-weight: normal;
    margin: 0;
  }

  p {
    margin: 5px 0;
  }
  #logo-on-power {
    width: 20rem;
    opacity: 0.7;
  }

  .messages {
    margin: 55px 0;
    min-height: 210px;
  }

  .crt::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;

    background: repeating-linear-gradient(
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.25) 3px,
      rgba(0, 0, 0, 0.25) 4px
    );
  }

  .loading-container {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .progress-bar {
    display: flex;
    gap: 3px;
    padding: 6px;
    background: #c0c0c0;
    border: 3px inset #ddd;
    width: min(520px, 70vw);
    height: 32px;
  }

  .progress-bar span {
    flex: 1;
    background: #d4d0c8;
  }

  .progress-bar .filled {
    background: #000080;
  }

  .mascot {
    width: 100px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .power-screen {
    min-height: 100dvh;
    display: grid;
    place-content: center;
    text-align: center;
    gap: 25px;
  }

  button {
    padding: 10px 20px;
    background: #c0c0c0;
    border: 3px outset #ddd;
  }

  .glitch-screen {
    min-height: 100dvh;
    background: #03030a;
  }

  @media (prefers-reduced-motion: reduce) {
    .mascot {
      animation: none;
    }
  }
</style>
>>>>>>> Stashed changes
