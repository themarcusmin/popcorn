<script lang="ts">
  export let media_type;
  export let media_id;

  // VOTE AVERAGE
  import FaStar from 'svelte-icons/fa/FaStar.svelte';

  // Watched Status
  import Favorite from './Favorite.svelte';
  import WatchButton from './WatchButton.svelte';

  export let title: string;
  export let original_title: string = '';
  export let release_year: string = ''; // movie
  export let runtime: number = 0; // movie
  export let release_year_tv: string = ''; // tv
  export let number_of_seasons: number = 0; // tv
  export let vote_average: number;
  export let vote_count: number;
  export let all_genres: string;
  export let overview: string;
</script>

<div class="details">
  <Favorite {media_id} {media_type} />
  <div class="nm_details">
    <div class="nm_title">{title || original_title}</div>
    <!-- movie -->
    {#if release_year && runtime}
      <span>{`${release_year} · ${runtime} min`}</span>
    {/if}
    <!-- tv -->
    {#if release_year_tv && number_of_seasons}
      <span>{`${release_year_tv} · ${number_of_seasons} seasons`}</span>
    {/if}
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
  <div class="genre">{all_genres || 'Genre'}</div>
  <WatchButton />
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
