<script lang="ts">
  // isFavorite
  import IoIosHeartEmpty from 'svelte-icons/io/IoIosHeartEmpty.svelte';
  import IoIosHeart from 'svelte-icons/io/IoIosHeart.svelte';

  // VOTE AVERAGE
  import FaStar from 'svelte-icons/fa/FaStar.svelte';

  // Watched Status
  import WatchDropdown from './WatchDropdown.svelte';

  export let isFavorite: boolean;
  export let title: string;
  export let original_title: string;
  export let release_year: string;
  export let runtime: number;
  export let vote_average: number;
  export let vote_count: number;
  export let all_genres: string;
  export let overview: string;

  const handleAddToFavorites = (): void => {
    isFavorite = true;
  };

  const handleRemoveFromFavorites = (): void => {
    isFavorite = false;
  };
</script>

<div class="details">
  {#if isFavorite}
    <div class="favorites red_heart" on:click={handleRemoveFromFavorites}>
      <IoIosHeart />
    </div>
  {:else}
    <div class="favorites" on:click={handleAddToFavorites}>
      <IoIosHeartEmpty />
    </div>
  {/if}
  <div class="nm_details">
    <div class="nm_title">{title || original_title}</div>
    <span>{`${release_year} · ${runtime} min`}</span>
  </div>
  <div class="vote">
    <div class="ratings">
      <div class="icon">
        <FaStar />
      </div>
      <div>{vote_average}</div>
    </div>
    <div class="count">{vote_count} Votes</div>
  </div>
  <div class="genre">{all_genres}</div>
  <WatchDropdown />
  <div class="overview">
    {overview}
  </div>
</div>

<style>
  .details {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0.5em 1.5em 0 1.5em;
    font-size: small;
    position: relative;
  }

  .details .nm_details {
    display: none;
  }

  .details .favorites {
    position: absolute;
    top: 0;
    right: 0;
    height: 2.5em;
    width: 2.5em;
    margin: 1em 1.5em;
    cursor: pointer;
  }

  .details .red_heart {
    color: #e31b23;
  }

  .details .vote {
    color: #ff9529;
    display: flex;
    flex-direction: row;
    gap: 1em;
    font-size: small;
    font-weight: bold;
  }

  .details .vote .ratings {
    display: flex;
    align-items: center;
    gap: 0.4em;
  }

  .details .vote .ratings .icon {
    width: 1.5em;
    height: 1.5em;
  }

  .details .vote .count {
    color: black;
    background: #ff9529;
    border-radius: 1em;
    padding: 0 1em;
  }

  .details .genre {
    color: rgb(226, 226, 226);
  }

  .details .overview {
    color: gray;
    font-size: medium;
  }

  .details .overview::selection {
    color: var(--text-selection-color);
  }

  @media (min-width: 481px) {
    .details {
      padding-top: 1em;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .details .favorites {
      margin: 2em;
    }

    .details .nm_details {
      display: block;
    }

    .details .nm_details .nm_title {
      font-weight: bolder;
      font-size: xxx-large;
    }

    .details .nm_details span {
      font-size: medium;
      color: gray;
    }
  }

  @media (min-width: 1025px) {
    .details .favorites {
      margin: 2em;
    }

    .details .nm_details {
      display: block;
    }

    .details .nm_details .nm_title {
      font-weight: bolder;
      font-size: xxx-large;
    }

    .details .nm_details span {
      font-size: medium;
      color: gray;
    }
  }
</style>
