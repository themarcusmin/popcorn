<script lang="ts">
  import GiPopcorn from 'svelte-icons/gi/GiPopcorn.svelte';
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte';
  import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte';
  import IoIosStats from 'svelte-icons/io/IoIosStats.svelte';
  import FaUserFriends from 'svelte-icons/fa/FaUserFriends.svelte';
  import GoSearch from 'svelte-icons/go/GoSearch.svelte';
  import IoMdExit from 'svelte-icons/io/IoMdExit.svelte';

  import { supabase } from '$supabase/supabaseClient';
  import { user } from '$stores/authStore';

  export let showMenu: boolean;
  export let handleToggleMenu: () => void;

  async function handleLogout() {
    await supabase.auth.signOut();
    showMenu = !showMenu;
  }
</script>

<nav class:open={showMenu}>
  <header>
    <div>
      <div class="home_icon">
        <GiPopcorn />
      </div>
      <div class="title">POPCORN</div>
    </div>
    <div class="home_icon" on:click={handleToggleMenu}>
      <IoIosClose />
    </div>
  </header>

  <ul>
    {#if $user}
      <li>
        <a href="/favorites">
          <div class="nav_icon">
            <FaRegHeart />
          </div>
          <p>Favorites</p>
        </a>
      </li>
      <li>
        <a href={`/profile/${$user.email}`}>
          <div class="nav_icon">
            <IoIosStats />
          </div>
          <p>Stats</p>
        </a>
      </li>
      <li>
        <a href="/friends">
          <div class="nav_icon">
            <FaUserFriends />
          </div>
          <p>Friends</p>
        </a>
      </li>
      <li>
        <a href="/findfriends">
          <div class="nav_icon">
            <GoSearch />
          </div>
          <p>Find Friends</p>
        </a>
      </li>
      <li class="logout">
        <div class="auth" on:click={handleLogout}>
          <div class="nav_icon">
            <IoMdExit />
          </div>
          <p>Logout</p>
        </div>
      </li>
    {:else}
      <li>
        <a href="/login">
          <div class="nav_icon">
            <IoMdExit />
          </div>
          <p>Login</p>
        </a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    width: 0; /* 0 width - change this with JavaScript */
    height: 100%;
    overflow: hidden; /* Disable scroll */
    z-index: 4;
    top: 0;
    left: 0;
    background: black;
    transition: 0.4s;
  }

  .open {
    width: 100%;
  }

  nav header {
    background-color: #0a1014;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
  }

  nav header div {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  nav header div .title {
    font-size: xx-large;
    letter-spacing: 0.1em;
  }

  nav .home_icon {
    width: 2.5em;
    height: 2.5em;
    cursor: pointer;
  }

  nav .home_icon:hover,
  .home_icon:active {
    color: darkorange;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav ul li {
    padding: 0 1.5em;
    cursor: pointer;
  }

  nav ul li:hover,
  nav ul li:active {
    background: #2a3236;
    color: darkorange;
  }

  nav ul li a {
    display: flex;
    flex-direction: row;
    align-items: center;
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

  nav ul li .auth {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  nav ul .logout {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
