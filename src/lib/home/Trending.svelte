<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';
  import Carousel from '$lib/Carousel.svelte';
  import type { SearchResultType } from '$models/searchresult.interface';

  export let trendingResults: SearchResultType[];
  export let title: string;
</script>

<Carousel {title}>
  {#each trendingResults as { poster_path, title, name, id, media_type }}
    <div class="trending_item">
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
    </div>
  {/each}
</Carousel>

<style>
  .trending_item {
    width: 9em;
  }

  .trending_item:first-child {
    margin-left: 1.5em;
  }

  .trending_item:last-child {
    margin-right: 1.5em;
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
