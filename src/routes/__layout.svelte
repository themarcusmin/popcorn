<script context="module">
  export async function load({ page }) {
    const session = supabase.auth.session();
    // Redirect if routes match /login or /register AND session exists
    if (/[login|register]/g.test(page.path) && session) {
      return { redirect: '/', status: 302 };
    }
    return { props: {} };
  }
</script>

<script lang="ts">
  import { supabase } from '$supabase/supabaseClient';
  import { user } from '$stores/authStore';

  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_: any, session: { user: any }) => {
    user.set(session?.user);
  });

  import Header from '$lib/Header.svelte';
  import SideMenu from '$lib/SideMenu.svelte';
  import Footer from '$lib/Footer.svelte';

  let showMenu: boolean = false;

  const handleToggleMenu = (): void => {
    showMenu = !showMenu;
  };
</script>

<SideMenu {showMenu} {handleToggleMenu} />

<main>
  <Header bind:showMenu />
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
    --fallback-img-color: #3a3b3c;
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
</style>
