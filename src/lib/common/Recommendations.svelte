<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';
  import type { RecommendationType } from '$models/movie.interface';

  import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';

  export let recommendationsResults: RecommendationType[];
</script>

<div class="recommendations">
  <div class="title">You may also like</div>
  <div class="carousel">
    {#each recommendationsResults as { poster_path, title, id }}
      <div class="recommended_movie">
        <a rel="external" href={`/movie/${id}`}>
          <img src={`${IMAGE_URL}${poster_path}`} alt={title} />
          <p>{title}</p>
        </a>
        <button>
          <div class="icon" aria-hidden="true" tabindex="-1">
            <IoIosAdd />
          </div>
          <div>Watchlist</div>
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .recommendations {
    margin-bottom: 1em;
  }

  .recommendations .title {
    padding: 0 1.5em 0.5em;
    font-size: x-large;
  }

  .recommendations .carousel {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    gap: 1.25em;
    height: auto;
    /* Hide horizontal scrollbar */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  .recommendations .carousel::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .recommendations .carousel .recommended_movie {
    width: 9em;
  }

  .recommendations .carousel .recommended_movie:first-child {
    margin-left: 1.5em;
  }

  .recommendations .carousel .recommended_movie:last-child {
    margin-right: 1.5em;
  }

  .recommendations .carousel .recommended_movie img {
    width: 8.5em;
    height: 12em;
    object-fit: cover;
  }

  .recommendations .carousel .recommended_movie img:hover,
  img:active {
    opacity: 0.75;
  }

  .recommendations .carousel .recommended_movie p {
    margin: 0.5em;
    height: 4.75em;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .recommendations .carousel .recommended_movie p:hover {
    text-decoration: underline;
  }

  .recommendations .carousel .recommended_movie button {
    width: 100%;
    background: inherit;
    color: white;
    border-radius: 1em;
    border: 1px solid gray;
    padding: 0.5em;
    transition: transform 0.2s;
    margin-bottom: 0.5em;
  }

  .recommendations .carousel .recommended_movie button:hover,
  button:active {
    background: #3a3b3c;
    border-color: #3a3b3c;
  }

  .recommendations .carousel .recommended_movie button:active {
    transform: scale(0.95);
  }

  .recommendations .carousel .recommended_movie button .icon {
    width: 1.5em;
    height: 1.5em;
  }

  .recommendations .carousel .recommended_movie button div {
    display: inline-block;
    vertical-align: middle;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .recommendations .carousel {
      margin: 0 -3em;
    }

    .recommendations .carousel .recommended_movie:first-child {
      margin-left: 4.5em;
    }

    .recommendations .carousel .recommended_movie:last-child {
      margin-right: 4.5em;
    }
  }

  @media (min-width: 1025px) {
    .recommendations .carousel {
      margin: 0 -4em;
    }

    .recommendations .carousel .recommended_movie:first-child {
      margin-left: 5.5em;
    }

    .recommendations .carousel .recommended_movie:last-child {
      margin-right: 5.5em;
    }
  }
</style>
