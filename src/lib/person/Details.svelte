<script lang="ts">
  import IoIosHeartEmpty from 'svelte-icons/io/IoIosHeartEmpty.svelte';
  import IoIosHeart from 'svelte-icons/io/IoIosHeart.svelte';

  export let name: string;
  export let birthyear: string;
  export let imdb_id: string;
  export let isFavorite: boolean;

  const handleAddToFavorites = (): void => {
    isFavorite = true;
  };

  const handleRemoveFromFavorites = (): void => {
    isFavorite = false;
  };
</script>

<div class="details">
  <h2>{name}</h2>
  <p>{birthyear}</p>
  <div class="misc">
    <a href={`https://imdb.com/name/${imdb_id}`}><button>IMDb</button></a>
    {#if isFavorite}
      <div class="favorites red_heart" on:click={handleRemoveFromFavorites}>
        <IoIosHeart />
      </div>
    {:else}
      <div class="favorites" on:click={handleAddToFavorites}>
        <IoIosHeartEmpty />
      </div>
    {/if}
  </div>
</div>

<style>
  .details h2 {
    margin: 0.5em 0;
  }

  .details p {
    color: var(--text-color);
  }

  .details .misc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details .misc .favorites {
    height: 2.5em;
    width: 2.5em;
    cursor: pointer;
  }

  .details .misc .red_heart {
    color: #e31b23;
  }

  .details .misc a button {
    padding: 0.5em 1em;
    background: #dba506;
    border: none;
    border-radius: 0.5em;
    font-size: large;
    font-weight: bolder;
  }
</style>
