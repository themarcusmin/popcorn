<script lang="ts">
  import SearchResult from '$lib/home/SearchResult.svelte';
  import type { SearchResponseType } from '$models/searchresponse.interface';

  export let favorites: SearchResponseType;
</script>

<div>
  <h3>Favorites</h3>
  <SearchResult data={favorites} />
</div>

<style>
  div h3 {
    margin: 1em 2em 0.5em;
  }
</style>
