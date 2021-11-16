<script lang="ts">
  import { fly } from 'svelte/transition';
  import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte';

  export let query: string;

  export let debounceSearchRequest: svelte.JSX.FormEventHandler<HTMLInputElement>;
</script>

<div class="search_container" transition:fly={{ x: 375 }}>
  <div class="search_box">
    <div>
      <IoIosSearch />
    </div>
    <input
      bind:value={query}
      on:input={debounceSearchRequest}
      placeholder="Search movies, tv or stars"
      type="text"
    />
  </div>
</div>

<style>
  .search_container {
    display: grid;
    padding: 0.2em 1em;
  }

  .search_container div {
    grid-area: 1/1/2/2;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .search_container {
      padding: 0.2em 3em;
    }
  }

  @media (min-width: 1025px) {
    .search_container {
      padding: 0.2em 4em;
    }
  }

  @media (min-width: 1281px) {
    .search_container {
      padding: 0.5em 6em;
    }
  }

  .search_container .search_box {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
  }

  .search_container .search_box div {
    position: absolute;
    color: gray;
    left: 1.5em;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 2em;
    width: 2em;
  }

  .search_container .search_box input {
    font-size: medium;
    padding-left: 2.75em;
    width: 100%;
    height: 2.75em;
    box-sizing: border-box;
    border-radius: 0.75em;
    border: none;
    outline: none;
  }

  .search_container .search_box input:focus {
    outline: 3px solid darkorange;
  }
</style>
