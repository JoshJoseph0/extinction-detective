
<script lang="ts">
  import { gsap } from 'gsap';

  let { screen = null }: { screen?: string | null } = $props();
  let previousScreen: string | null | undefined;
  let staticEl: HTMLDivElement;
  let noiseCanvas: HTMLCanvasElement;

  function drawNoise() {
    if (!noiseCanvas) return;

    const canvas = noiseCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 240;
    canvas.height = 160;

    const image = ctx.createImageData(240, 160);

    for (let i = 0; i < image.data.length; i += 4) {
      const value = Math.random() * 255;
      image.data[i] = value;
      image.data[i + 1] = value;
      image.data[i + 2] = value;
      image.data[i + 3] = 255;
    }

    ctx.putImageData(image, 0, 0);
  }

  function playTransition() {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    const tl = gsap.timeline();

    tl.set(staticEl, { opacity: 0, x: 0 })
      .to(staticEl, {
        opacity: 1,
        duration: 0.06,
        onStart: drawNoise
      })
      .call(drawNoise)
      .to(staticEl, {
        x: -8,
        duration: 0.05,
        ease: 'steps(2)',
        onComplete: drawNoise
      })
      .to(staticEl, {
        opacity: 0,
        x: 0,
        duration: 0.12,
        onStart: drawNoise
      }, '<');
  }

  $effect(() => {
    const nextScreen = screen;
    if (previousScreen === undefined) {
      previousScreen = nextScreen;
      return;
    }

    if (nextScreen === previousScreen) return;

    previousScreen = nextScreen;
    playTransition();
  });
</script>

<div class="static" bind:this={staticEl} aria-hidden="true">
  <canvas bind:this={noiseCanvas}></canvas>
</div>

<style>
  .static {
    position: relative;
    position: fixed;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
    background: #000;
  }

  .static canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
