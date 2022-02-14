<script lang="ts">
  import { fade } from 'svelte/transition';
  import GiPopcorn from 'svelte-icons/gi/GiPopcorn.svelte';
  import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';

  export let showMenu: boolean;

  const handleToggleMenu = (): void => {
    showMenu = !showMenu;
  };
</script>

<header>
  <a href="/">
    <div class="header_icon">
      <GiPopcorn />
    </div>
  </a>
  <div class="header_icon" on:click={handleToggleMenu} out:fade>
    <IoIosMenu />
  </div>
</header>

<style>
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
