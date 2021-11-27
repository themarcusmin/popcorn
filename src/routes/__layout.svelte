<script lang="ts">
  import { fade } from 'svelte/transition';
  import GiPopcorn from 'svelte-icons/gi/GiPopcorn.svelte';
  import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';

  // add header here
  import SideMenu from '$lib/SideMenu.svelte';
  import Footer from '$lib/Footer.svelte';

  let showMenu: boolean = false;

  const handleToggleMenu = (): void => {
    showMenu = !showMenu;
  };
</script>

<SideMenu {showMenu} {handleToggleMenu} />

<main>
  <header>
    <div class="header_icon">
      <GiPopcorn />
    </div>
    <div class="header_icon" on:click={handleToggleMenu} out:fade>
      <IoIosMenu />
    </div>
  </header>

  <slot />

  <Footer />
</main>

<style>
  :global(body) {
    background-color: #0a1014;
    color: white;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  :global(:root) {
    --text-color: gray;
    --text-selection-color: darkorange;
  }

  :global(.icon) {
    width: 2.5em;
    height: 2.5em;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(button) {
    cursor: pointer;
  }

  main {
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
    position: relative;
    min-height: 100vh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #0a1014;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
  }

  .header_icon {
    width: 2.5em;
    height: 2.5em;
    cursor: pointer;
  }

  .header_icon:hover,
  .header_icon:active {
    color: darkorange;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    header {
      padding: 1em 3em;
    }
  }

  @media (min-width: 1025px) {
    header {
      padding: 1em 4em;
    }
  }

  @media (min-width: 1281px) {
    header {
      padding: 1em 6em;
    }
  }
</style>
