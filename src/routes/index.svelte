<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  import GiPopcorn from 'svelte-icons/gi/GiPopcorn.svelte';
  import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte';
  import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte';
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
  import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte';
  import IoIosStats from 'svelte-icons/io/IoIosStats.svelte';

  let showMenu: boolean = false;
  let opacity: number = 0.5,
    delay: number = 300;

  const handleToggleMenu = (): void => {
    showMenu = !showMenu;
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<header>
  <div class="home_icon">
    <GiPopcorn />
  </div>
  <div class="icon" on:click={handleToggleMenu} out:fade>
    {#if showMenu}
      <IoIosClose />
    {:else}
      <IoIosMenu />
    {/if}
  </div>
</header>
<div class="content">
  {#if showMenu}
    <nav transition:fly={{ x: -375, opacity, delay }}>
      <ul>
        <li>
          <div class="nav_icon">
            <FaRegHeart />
          </div>
          <p>Favorites</p>
        </li>
        <li>
          <div class="nav_icon">
            <IoIosStats />
          </div>
          <p>Stats</p>
        </li>
      </ul>
    </nav>
  {:else}
    <div transition:fly={{ x: 375, opacity, delay }} class="search_container">
      <div class="icon">
        <IoIosSearch />
      </div>
      <input placeholder="Search movies, tv or stars" />
    </div>
  {/if}
</div>

<!-- <div class="recommender">
  <div class="godzilla">godzilla</div>
  <div class="aa">New releases</div>
</div> -->
{#if !showMenu}
  <footer>
    <p>about</p>
    <div class="icon">
      <FaGithub />
    </div>
  </footer>
{/if}

<style>
  :global(body) {
    background-color: #0a1014;
    color: white;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
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

  .home_icon {
    width: 2.5em;
    height: 2.5em;
  }

  .home_icon:hover,
  .home_icon:active {
    color: darkorange;
  }

  .content {
    display: grid;
  }

  .content nav,
  .search_container {
    grid-area: 1/1/2/2;
  }

  .search_container {
    position: relative;
    padding: 0.2em 1em;
    box-sizing: border-box;
  }

  .search_container div {
    position: absolute;
    color: gray;
    top: 0.5em;
    left: 1.5em;
    height: 2em;
    width: 2em;
  }

  .search_container input {
    font-size: medium;
    padding-left: 2.75em;
    width: 100%;
    height: 2.75em;
    box-sizing: border-box;
    border-radius: 0.75em;
    border: none;
    outline: none;
  }

  .search_container input:focus {
    outline: 3px solid darkorange;
  }

  nav {
    transition: 0.3s ease;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav ul li {
    padding: 0 1.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  nav ul li:hover,
  nav ul li:active {
    background: #2a3236;
    color: darkorange;
  }

  nav ul li .nav_icon {
    width: 2em;
    height: 2em;
  }

  nav ul li p {
    margin-left: 1em;
    font-size: large;
    letter-spacing: 0.05em;
  }

  footer {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #858585;
  }

  footer p {
    font-size: large;
    margin: 0;
  }

  .icon {
    width: 2.5em;
    height: 2.5em;
  }

  /* .recommender {
    padding: 1em;
  }

  .godzilla {
    height: 30em;
    background: gray;
  }

  .aa {
    height: 20em;
    background: darkcyan;
  } */
</style>
