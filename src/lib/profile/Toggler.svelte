<script lang="ts">
  export let userid: string;

  import type { WatchedDataByMonthType } from '$models/supabase.interface';
  import { getWatched, getToWatch, getWatchedCount, getToWatchCount } from '$api/watch';

  // Query for count of watched and to watch
  let watchedCount = 0;
  let toWatchCount = 0;

  $: getWatchedCount(userid)
    .then((count: number) => (watchedCount = count))
    .catch(console.error);

  $: getToWatchCount(userid)
    .then((count: number) => (toWatchCount = count))
    .catch(console.error);

  // Query for watched media
  let watchedByMonth: WatchedDataByMonthType;

  $: getWatched(userid)
    .then((data) => {
      watchedByMonth = data;
    })
    .catch(console.error);

  // Query for to watch media
  let toWatchByMonth: WatchedDataByMonthType;

  $: getToWatch(userid)
    .then((data) => {
      toWatchByMonth = data;
    })
    .catch(console.error);

  import { IMAGE_URL } from '$lib/constants';
  import Carousel from '$lib/Carousel.svelte';

  let currentView = 0;

  function toggleWatched() {
    currentView = 0;
  }

  function toggleToWatch() {
    currentView = 1;
  }
</script>

<div class="container">
  <div class="subheader">
    <button class:underline={currentView === 0} on:click={toggleWatched}>
      <p class:hover-underline-animation={currentView === 1}>
        Watched {watchedCount ? `(${watchedCount})` : ''}
      </p>
    </button>
    <button class:underline={currentView === 1} on:click={toggleToWatch}>
      <p class:hover-underline-animation={currentView === 0}>
        To Watch {toWatchCount ? `(${toWatchCount})` : ''}
      </p>
    </button>
  </div>
  <!-- Watched Media -->
  {#if currentView === 0}
    <!-- watchedByMonth is an object, not an array -->
    {#if watchedByMonth === undefined || !Object.entries(watchedByMonth).length}
      <div class="nomedia">No media available</div>
    {:else}
      {#each Object.entries(watchedByMonth) as [month, media]}
        <Carousel title={month}>
          {#each media as { poster_path, title, id, media_type }}
            <div class="trending_item">
              <a rel="external" href={`/${media_type}/${id}`}>
                {#if poster_path}
                  <img src={`${IMAGE_URL}${poster_path}`} alt={title} />
                {:else}
                  <div class="poster_path_fallback">
                    {title}
                  </div>
                {/if}
                <p>{title}</p>
              </a>
            </div>
          {/each}
        </Carousel>
      {/each}
    {/if}
    <!-- To Watch Media -->
  {:else}
    <!-- toWatchByMonth is an object, not an array -->
    {#if toWatchByMonth === undefined || !Object.entries(toWatchByMonth).length}
      <div class="nomedia">No media available</div>
    {:else}
      {#each Object.entries(toWatchByMonth) as [month, media]}
        <Carousel title={month}>
          {#each media as { poster_path, title, id, media_type }}
            <div class="trending_item">
              <a rel="external" href={`/${media_type}/${id}`}>
                {#if poster_path}
                  <img src={`${IMAGE_URL}${poster_path}`} alt={title} />
                {:else}
                  <div class="poster_path_fallback">
                    {title}
                  </div>
                {/if}
                <p>{title}</p>
              </a>
            </div>
          {/each}
        </Carousel>
      {/each}
    {/if}
  {/if}
</div>

<style>
  .container {
    padding: 0.5em 2em 1em;
  }

  .subheader {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5em;
    justify-content: space-between;
  }

  .subheader > button {
    /* margin: 0 4em; */
    width: 50%;
    text-align: center;
    background-color: inherit;
    color: white;
    border: none;
    font-size: larger;
    font-family: inherit;
  }

  .underline {
    text-decoration-line: underline;
    text-underline-offset: 1em;
    padding-bottom: 0.75em;
  }

  .nomedia {
    margin: 0 2em;
    color: gray;
  }

  /* Credits: https://www.30secondsofcode.org/css/s/hover-underline-animation */
  .hover-underline-animation {
    display: inline-block;
    position: relative;
    padding-bottom: 0.75em;
    color: white;
  }

  .hover-underline-animation:after {
    /* content: '';
    position: absolute;
    width: 50%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out; */
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  .hover-underline-animation:hover:after {
    /* transform: scaleX(1);
    transform-origin: bottom left; */
    width: 100%;
    left: 0;
  }

  /* start of carousel */
  .trending_item {
    width: auto;
  }

  .trending_item img {
    width: 8.5em;
    height: 12em;
    object-fit: cover;
  }

  .trending_item img:hover,
  img:active {
    opacity: 0.75;
  }

  .trending_item .poster_path_fallback {
    width: 8.5em;
    height: 12em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--fallback-img-color);
  }

  .trending_item p {
    margin: 0.5em;
    width: 8.5em;
    height: 4.75em;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .trending_item p:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .trending_item:first-child {
      margin-left: 4.5em;
    }

    .trending_item:last-child {
      margin-right: 4.5em;
    }
  }

  @media (min-width: 1025px) {
    .trending_item:first-child {
      margin-left: 5.5em;
    }

    .trending_item:last-child {
      margin-right: 5.5em;
    }
  }
</style>
