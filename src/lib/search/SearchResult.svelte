<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';

  import type { SearchResponseType } from '$models/searchresponse.interface';

  export let data: SearchResponseType;

  $: ({ page, total_pages, results } = data);

  $: show = new Array(results.length).fill(false);

  // Toggle detail panel for desktops and laptops
  const handleShowPanel = (index: number): void => {
    show[index] = true;
  };
  const handleHidePanel = (index: number): void => {
    show[index] = false;
  };

  function getYear(date: string): string {
    return date?.split('-')[0];
  }

  // View more results
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleViewMore = () => dispatch('viewmore');
</script>

<div class="card_container">
  {#each results as { id, media_type, name, title, first_air_date, release_date, poster_path, origin_country }, i}
    <a href={`/${media_type}/${id}`}>
      <div
        class="card"
        on:mouseenter={() => handleShowPanel(i)}
        on:mouseleave={() => handleHidePanel(i)}
      >
        {#if poster_path}
          <img src={`${IMAGE_URL}${poster_path}`} alt={name || title} />
        {:else}
          <div class="no_img">{name || title}</div>
        {/if}
        <div class="info">
          <div class="type_lang">
            <div>{media_type.toUpperCase()}</div>
            <div>{origin_country?.length ? origin_country[0] : ''}</div>
          </div>
          <div class="title">{name || title}</div>
          <div class="release_year">{getYear(first_air_date) || getYear(release_date) || ''}</div>
        </div>
        <div class="info_desktop" class:showdetail={show[i]}>
          <div class="type_lang">
            <div>{media_type.toUpperCase()}</div>
            <div>{origin_country?.length ? origin_country[0] : ''}</div>
          </div>
          <div>
            <div class="title">{name || title}</div>
            <div>{getYear(first_air_date) || getYear(release_date) || ''}</div>
          </div>
        </div>
      </div>
    </a>
  {/each}
  {#if page < total_pages}
    <div class="card">
      <button class="view_more" on:click={handleViewMore}>View More</button>
    </div>
  {/if}
</div>

<style>
  .card_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding: 1em;
    padding-bottom: 4em; /* Space for footer */
  }

  .card_container .card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 0.25em;
    height: 16em;
  }

  .card_container .card:active {
    outline: 2px solid darkorange;
  }

  .card_container .card .no_img {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    background: #3a3b3c;
  }

  /* Hidden Desktop Info Panel */
  .card_container .card .info_desktop {
    display: none;
  }

  /* Mobile Info Panel */
  .card_container .card .info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .card_container .card .info .type_lang {
    font-size: small;
    color: lightgray;
    padding: 0.75em 0.5em 0 0.5em;
    display: flex;
    justify-content: space-between;
  }

  .card_container .card .info .title {
    font-size: large;
    color: white;
    padding: 0em 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .card_container .card .info .release_year {
    font-size: small;
    color: lightgray;
    padding: 0 0.5em 0.75em 0.5em;
  }

  .card_container .card img {
    width: 100%;
    height: 100%;
  }

  .card_container .view_more {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3a3b3c;
    color: darkorange;
    border: none;
    cursor: pointer;
    font-size: medium;
  }

  .card_container .view_more:hover {
    background: #1a1b1c;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .card_container .card {
      height: 14em;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 1em 3em;
      padding-bottom: 4.5em;
    }
  }

  @media (min-width: 1025px) {
    .card .info {
      display: none !important; /* Remove detail panel for non-desktop devices */
    }

    .showdetail {
      display: flex !important; /* Hover to show detail panel for desktops and laptops*/
    }

    .card_container .card .info_desktop {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      background: #1d1d1dbf;
    }

    .card_container .card .info_desktop > * {
      padding: 1em;
      color: darkgray;
    }

    .card_container .card .type_lang {
      display: flex;
      justify-content: space-between;
    }

    .card_container .card .info_desktop .title {
      font-size: x-large;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4; /* number of lines to show */
      line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 1em 4em;
      padding-bottom: 4em;
    }
  }

  @media (min-width: 1281px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 2em 6em;
      padding-bottom: 4em;
    }
  }
</style>
