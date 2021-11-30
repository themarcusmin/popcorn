<script lang="ts">
  import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';

  import { IMAGE_URL } from '$lib/constants';
  import Carousel from '$lib/Carousel.svelte';

  import type { RecommendationType } from '$models/media.interface';
  export let recommendationsResults: RecommendationType[];
</script>

<Carousel title="You may also like">
  {#each recommendationsResults as { poster_path, title, name, id, media_type }}
    <div class="recommended_movie">
      <a rel="external" href={`/${media_type}/${id}`}>
        {#if poster_path}
          <img src={`${IMAGE_URL}${poster_path}`} alt={title || name} />
        {:else}
          <div class="poster_path_fallback">
            {title || name}
          </div>
        {/if}
        <p>{title || name}</p>
      </a>
      <button>
        <div class="icon" aria-hidden="true" tabindex="-1">
          <IoIosAdd />
        </div>
        <div>Watchlist</div>
      </button>
    </div>
  {/each}
</Carousel>

<style>
  .recommended_movie {
    width: 9em;
  }

  .recommended_movie:first-child {
    margin-left: 1.5em;
  }

  .recommended_movie:last-child {
    margin-right: 1.5em;
  }

  .recommended_movie img {
    width: 8.5em;
    height: 12em;
    object-fit: cover;
  }

  .recommended_movie img:hover,
  img:active {
    opacity: 0.75;
  }

  .recommended_movie .poster_path_fallback {
    width: 8.5em;
    height: 12em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--fallback-img-color);
  }

  .recommended_movie p {
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

  .recommended_movie p:hover {
    text-decoration: underline;
  }

  .recommended_movie button {
    width: 100%;
    background: inherit;
    color: white;
    border-radius: 1em;
    border: 1px solid gray;
    padding: 0.5em;
    transition: transform 0.2s;
    margin-bottom: 0.5em;
  }

  .recommended_movie button:hover,
  button:active {
    background: #3a3b3c;
    border-color: #3a3b3c;
  }

  .recommended_movie button:active {
    transform: scale(0.95);
  }

  .recommended_movie button .icon {
    width: 1.5em;
    height: 1.5em;
  }

  .recommended_movie button div {
    display: inline-block;
    vertical-align: middle;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .recommended_movie:first-child {
      margin-left: 4.5em;
    }

    .recommended_movie:last-child {
      margin-right: 4.5em;
    }
  }

  @media (min-width: 1025px) {
    .recommended_movie:first-child {
      margin-left: 5.5em;
    }

    .recommended_movie:last-child {
      margin-right: 5.5em;
    }
  }
</style>
