<script>
  import "../app.css";

  import "@fontsource/vt323";
  import "@fontsource/pixelify-sans";
  import "@fontsource/ibm-plex-mono";

  let { children, mrPlanet } = $props();

  let mrPlanethappy = $state(false);
  let mrPlanetSad = $state(false);
  let mrPlanetNeutral = $state(false);
  let mrPlanetAngry = $state(false);
  let mrPlanetSurprised = $state(false);
  let mrPlanetTalking = $state(false);
</script>
