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
  import AfterlightAnimation from "../AfterlightAnimation.svelte";

  //defining props for the component, seems to be working well, dont chnnge for the moment
  let { onComplete, onEnter = () => {} }: {
    onComplete: () => void;
    onEnter?: () => void;
  } = $props();

  let stage = $state("off");
  let progress = $state(0);
  let visibleLines = $state(0);
  let crtBackground: HTMLDivElement;
  let bootContent: HTMLDivElement;
  let scanlines: HTMLDivElement;
  let tvStatic: HTMLDivElement;

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
      onEnter();
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
        stage = "entering";
        onEnter();
      },
      [],
      7,
    );

    // Move through the glass while the already-mounted login screen is revealed.
    bootTimeline.to(crtBackground, {
      scale: 1.22,
      duration: 1.6,
      ease: "power2.inOut",
    }, 7);
    bootTimeline.to(bootContent, {
      scale: 1.06,
      opacity: 0,
      duration: 0.55,
      ease: "power2.in",
    }, 7);
    bootTimeline.to(scanlines, {
      opacity: 0,
      duration: 1.1,
      ease: "power2.inOut",
    }, 7.3);
    bootTimeline.to(tvStatic, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
    }, 7.2);
    bootTimeline.to(crtBackground, {
      opacity: 0,
      duration: 1.1,
      ease: "power2.inOut",
    }, 7.5);

    bootTimeline.play();
  }

  onDestroy(() => {
    timeline?.kill();
  });
</script>

<div class="boot-shell" class:entering={stage === "entering"}>
  <div class="crt-background" bind:this={crtBackground} aria-hidden="true"></div>
  <div class="boot-content" bind:this={bootContent}>
{#if stage === "off"}
  <div class="power-screen">
    <div class="logo-animation">
      <AfterlightAnimation
        name="loading-wordmark"
        alt="Mr. Planet loading"
        width={520}
      />
    </div>
    <h1 style="font-size: 3rem;">Welcome, Investigator</h1>
    <button onclick={powerOn}> POWER ON </button>
    <aside class="mr-planet" aria-label="Mr Planet's welcome">
      <div class="speech-bubble">
        Welcome, Investigator.<br />For the best experience, use headphones and go full screen.
      </div>
      <AfterlightAnimation name="talking" alt="Mr Planet talking" width="100%" />
    </aside>
  </div>
{:else if stage === "complete"}
  <!-- Boot sequence finished; render no overlay over the login screen. -->
{:else}
  <div class="bios">
    <h1>AFTERLIGHT SYSTEMS v1.04</h1>

    <p>Your Space • Our Research</p>

    <div class="messages">
      {#each bootMessages.slice(0, visibleLines) as message}
        <p>&gt; {message}</p>
      {/each}
    </div>

    {#if stage === "loading" || stage === "entering"}
      <p>Loading Afterlight System... {progress}%</p>

      <div class="loading-container">
        <div class="progress-bar">
          {#each Array(20) as _, i}
            <span class:filled={progress >= (i + 1) * 5}></span>
          {/each}
        </div>

        <AfterlightAnimation
          name="loading-full-turn"
          alt="Mr Planet turning while the system loads"
          width={100}
        />
      </div>
    {/if}
  </div>
{/if}
  </div>
  <div class="tv-static" bind:this={tvStatic} aria-hidden="true"></div>
  <div class="scanlines" bind:this={scanlines} aria-hidden="true"></div>
</div>

<style>
  .boot-shell {
    position: relative;
    z-index: 1;
    min-height: 100dvh;
    overflow: clip;
    isolation: isolate;
    color: #f8f0d4;
  }

  .boot-shell.entering {
    pointer-events: none;
  }

  .crt-background {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: #000 url("/images/Retro CRT Scanline Background.png") center / 100% 100% no-repeat;
    transform-origin: center;
  }

  .boot-content {
    position: relative;
    min-height: 100dvh;
    transform-origin: center;
  }

  .scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    background: repeating-linear-gradient(
      transparent 0px,
      transparent 3px,
      rgba(0, 0, 0, 0.15) 3px,
      rgba(0, 0, 0, 0.15) 4px
    );
  }

  .tv-static {
    position: fixed;
    inset: -20%;
    z-index: 998;
    pointer-events: none;
    opacity: 0.075;
    background: url("/images/tv-static.svg") repeat;
    animation: tv-noise 0.24s steps(1, end) infinite;
  }

  @keyframes tv-noise {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3%, 2%); }
    50% { transform: translate(2%, -3%); }
    75% { transform: translate(-2%, -1%); }
  }

  .bios {
    min-height: 100dvh;
    padding: clamp(48px, 7vw, 76px);
    background: transparent;
    color: #f8f0d4;
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
  .messages {
    margin: 55px 0;
    min-height: 210px;
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

  .power-screen {
    position: relative;
    min-height: 100dvh;
    display: grid;
    place-content: center;
    text-align: center;
    gap: 25px;
  }

  .logo-animation {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
  }

  .mr-planet {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 240px;
    text-align: left;
  }

  .speech-bubble {
    position: relative;
    right: 80px;
    background: #0d1822;
    color: #f8f0d4;
    border: 2px solid #83c9a5;
    border-radius: 15px;
    padding: 18px;
    font-family: "VT323", monospace;
    font-size: 22px;
    line-height: 1.15;
    margin-bottom: 25px;
  }

  .speech-bubble::after {
    content: "";
    position: absolute;
    bottom: -25px;
    right: 38px;
    width: 30px;
    height: 26px;
    background: #83c9a5;
    clip-path: polygon(0 0, 75% 0, 100% 100%);
  }

  .speech-bubble::before {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: -20px;
    right: 41px;
    width: 24px;
    height: 23px;
    background: #0d1822;
    clip-path: polygon(0 0, 75% 0, 100% 100%);
  }

  @media (max-width: 1000px), (max-height: 700px) {
    .power-screen {
      padding: 24px;
    }

    .logo-animation {
      position: static;
      transform: none;
      width: min(520px, 100%);
      justify-self: center;
    }

    .mr-planet {
      position: relative;
      bottom: auto;
      right: auto;
      width: min(240px, 100%);
      justify-self: end;
      margin-top: 16px;
    }

    .speech-bubble {
      right: 0;
    }
  }

  button {
    padding: 10px 20px;
    background: #c0c0c0;
    border: 3px outset #ddd;
  }

  @media (prefers-reduced-motion: reduce) {
    .tv-static {
      animation: none;
    }
  }
</style>
