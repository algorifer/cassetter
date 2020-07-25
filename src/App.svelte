<script>
  // Utils
  import createMenu from "./utils/menu";

  // Components
  import Layout from "./components/Layout.svelte";

  // Stores
  import { samplesFolder } from "./stores/tapes";

  $: createMenu($samplesFolder !== null);
</script>

<style type="text/scss">
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 24px;
    font-family: "Hack", "Courier New", Courier, monospace;
    font-size: 12px;
    line-height: 1.2;
    background: var(--background);
    color: var(--f_high);
    -webkit-app-region: drag;
    overflow-x: hidden;
  }

  :global(button) {
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: left;
    color: var(--f_med);
    background: none;
    border: none;
    cursor: pointer;
    transition: 0.2s color;
  }

  :global(button:hover) {
    color: var(--f_high);
  }
</style>

<Layout />
