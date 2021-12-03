<script context="module">
  export async function load({ page }) {
    const { profileid } = page.params;

    // Get request to get favorites of [profileid]
    // Example json data
    let favorites = {
      page: 1,
      total_pages: 1,
      total_results: 23,
      results: [
        {
          id: 21,
          media_type: 'tv',
          name: 'The Office',
          poster_path: '/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
          first_air_date: '2010-10-1'
        },
        {
          id: 20,
          media_type: 'person',
          name: 'Brad Pitt',
          profile_path: '/kPshtQm3uxAn8FmdyR453mJoMBD.jpg'
        },
        {
          id: 300,
          media_type: 'movie',
          name: 'The Last Duel',
          poster_path: '/zjrJE0fpzPvX8saJXj8VNfcjBoU.jpg',
          release_date: '2021-3-2'
        }
      ]
    };

    return {
      props: { favorites }
    };
  }
</script>

<script lang="ts">
  import Favorites from '$lib/profile/Favorites.svelte';
  import type { SearchResponseType } from '$models/searchresponse.interface';

  export let favorites: SearchResponseType;
</script>

<Favorites {favorites} />
