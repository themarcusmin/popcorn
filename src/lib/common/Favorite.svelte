<script lang="ts">
  // Check session
  import { session } from '$stores/sessionStore';

  import { user } from '$stores/authStore';
  import { checkFavorite, addFavorite, removeFavorite } from '$api/favorite';
  import type { MediaIDType, MediaType } from '$models/supabase.interface';

  export let media_id: MediaIDType;
  export let media_type: MediaType;
  let isFavorite: boolean;

  // Check the favorites status of media
  $: checkFavorite(media_type, media_id, $user?.id).then((status: boolean) => {
    isFavorite = status;
  });

  import IoIosHeartEmpty from 'svelte-icons/io/IoIosHeartEmpty.svelte';
  import IoIosHeart from 'svelte-icons/io/IoIosHeart.svelte';

  // Handle DB updates via Supabase API call
  const handleAddToFavorites = (): void => {
    addFavorite(media_type, media_id, $user.id).then((status: boolean) => (isFavorite = status));
  };
  const handleRemoveFromFavorites = (): void => {
    removeFavorite(media_type, media_id, $user.id).then(
      (status: boolean) => (isFavorite = !status)
    );
  };
</script>

{#if !session}
  <a href="/login" class="favorites">
    <IoIosHeartEmpty />
  </a>
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
