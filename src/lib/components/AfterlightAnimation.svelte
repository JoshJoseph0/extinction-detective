<script lang="ts">
  import { untrack } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  type AnimationName = 'idle' | 'welcome-wave' | 'talking' | 'thinking' |
    'reading-clipboard' | 'loading-full-turn' | 'pointing' | 'celebration' |
    'searching' | 'access-denied' | 'thumbs-down' | 'warning' | 'suspicious-glance' |
    'hiding-evidence' | 'fake-reassurance' | 'system-glitch' | 'silent-stare' |
    'loading-wordmark' | 'planet-spin' | 'legacy-idle' | 'legacy-celebration' |
    'legacy-attention' | 'legacy-nervous' | 'legacy-system-glitch';

  let { name = 'idle', alt = '', width = 240, animated = true }: {
    name?: AnimationName;
    alt?: string;
    width?: number | string;
    animated?: boolean;
  } = $props();
  const size = $derived(typeof width === 'number' ? `${width}px` : width);
  const folder = '/animations/afterlight';
  let displayed = $state<{ name: AnimationName; animated: boolean }>();
  let reducedMotion = $state(false);
  const visible = $derived(displayed ?? { name, animated });

  $effect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reducedMotion = media.matches; };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  });

  $effect(() => {
    const requested = { name, animated };
    if (!untrack(() => displayed)) {
      displayed = requested;
      return;
    }

    let cancelled = false;
    async function prepare() {
      // Keep the current animation running until both new image variants are ready.
      const files = requested.animated
        ? [`${requested.name}.svg`, `${requested.name}-still.svg`]
        : [`${requested.name}-still.svg`];
      try {
        await Promise.all(files.map(async (file) => {
          const image = new Image();
          image.src = `${folder}/${file}`;
          await image.decode();
        }));
        if (!cancelled) displayed = requested;
      } catch {
        // A missing asset must not replace a visible character with a broken image.
      }
    }
    void prepare();
    return () => { cancelled = true; };
  });
</script>

<span class="animation" style:width={size}>
  {#key `${visible.name}-${visible.animated}`}
    <picture transition:fade={{ duration: reducedMotion ? 0 : 340, easing: cubicInOut }}>
      <source media="(prefers-reduced-motion: reduce)" srcset={`${folder}/${visible.name}-still.svg`} />
      <img src={`${folder}/${visible.name}${visible.animated ? '' : '-still'}.svg`} {alt} decoding="async" />
    </picture>
  {/key}
</span>

<style>
  .animation { display: inline-grid; max-width: 100%; line-height: 0; }
  picture { display: block; grid-area: 1 / 1; min-width: 0; width: 100%; }
  img { display: block; width: 100%; height: auto; }
</style>
