<script lang="ts">
  // Check session
  import { session } from '$stores/sessionStore';

  import { user } from '$stores/authStore';
  import { checkFavorite, addFavorite, removeFavorite } from '$api/favorite';
  import type { MediaIDType, MediaType } from '$models/supabase.interface';

  export let media_id: MediaIDType;
  export let media_type: MediaType;
  export let poster_path: string;
  export let title: string;

  let loading = false; // Makes sure heart icon is showing spinner on initial load
  let isFavorite = false;

  // Check the favorites status of media
  $: loading = true;
  checkFavorite(media_type, media_id, $user?.id)
    .then((status: boolean) => {
      isFavorite = status;
    })
    .catch(console.error)
    .finally(() => (loading = false));

  import Spinner from '$lib/common/Spinner.svelte';
  import IoIosHeartEmpty from 'svelte-icons/io/IoIosHeartEmpty.svelte';
  import IoIosHeart from 'svelte-icons/io/IoIosHeart.svelte';

  // Handle DB updates via Supabase API call
  const handleAddToFavorites = (): void => {
    addFavorite(media_type, media_id, $user.id, poster_path, title)
      .then((status: boolean) => (isFavorite = status))
      .catch(console.error);
  };
  const handleRemoveFromFavorites = (): void => {
    removeFavorite(media_type, media_id, $user.id)
      .then((status: boolean) => (isFavorite = !status))
      .catch(console.error);
  };
</script>

{#if !session}
  <a href="/login" class="favorites">
    <IoIosHeartEmpty />
  </a>
{:else if loading}
  <Spinner />
{:else if isFavorite}
  <div class="favorites red_heart" on:click={handleRemoveFromFavorites}>
    <IoIosHeart />
  </div>
{:else}
  <div class="favorites" on:click={handleAddToFavorites}>
    <IoIosHeartEmpty />
  </div>
{/if}

<style>
  .favorites {
    position: absolute;
    top: 0;
    right: 0;
    height: 2.5em;
    width: 2.5em;
    margin: 2.25em 1.5em 1em;
    cursor: pointer;
  }

  .red_heart {
    color: #e31b23;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .favorites {
      margin: 2em;
    }
  }

  @media (min-width: 1025px) {
    .favorites {
      margin: 2em;
    }
  }
</style>
