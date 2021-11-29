<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';

  export let poster_path: string;
  export let backdrop_path: string;
  export let title: string;
  export let original_title: string = '';
  export let release_year: string = ''; // movie
  export let runtime: number = 0; // movie

  export let release_year_tv: string = ''; // tv
  export let number_of_seasons: number = 0; // tv
</script>

<div class="poster">
  {#if poster_path}
    <img class="poster_img" src={`${IMAGE_URL}${poster_path}`} alt={title} />
  {:else}
    <div class="poster_img" />
  {/if}
  {#if backdrop_path}
    <img class="backdrop_img" src={`${IMAGE_URL}${backdrop_path}`} alt={title} />
  {:else}
    <div class="backdrop_img_fallback" />
  {/if}
  <div class="dark_overlay">
    {#if title.length > 12 || original_title.length > 12}
      <div class="title_long">{title || original_title}</div>
    {:else}
      <div class="title">{title || original_title}</div>
    {/if}
    <!-- movie -->
    {#if release_year && runtime}
      <span>{`${release_year} · ${runtime} min`}</span>
    {/if}
    <!-- tv -->
    {#if release_year_tv && number_of_seasons}
      <span>{`${release_year_tv} · ${number_of_seasons} seasons`}</span>
    {/if}
  </div>
</div>

<style>
  .poster {
    position: relative;
    overflow: hidden;
  }

  .poster .poster_img {
    display: none;
  }

  .poster .backdrop_img {
    width: 100%;
  }

  .poster .backdrop_img_fallback {
    height: 7em;
  }

  .poster .dark_overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .poster .dark_overlay .title {
    font-weight: bolder;
    font-size: xxx-large;
    margin: 0em 0.5em;
  }

  .poster .dark_overlay .title_long {
    font-weight: bolder;
    font-size: x-large;
    margin: 0em 1em;
  }

  .poster .dark_overlay span {
    color: white;
    font-weight: bold;
    font-size: medium;
    margin: 0em 1.5em 0.5em 1.5em;
  }

  @media (min-width: 481px) {
    .poster .dark_overlay span {
      color: #dddddd;
      font-weight: bold;
    }
  }

  @media (min-width: 768px) {
    .poster {
      display: flex;
      gap: 1em;
      height: auto;
    }

    .poster .poster_img {
      display: block;
      width: 25%;
      object-fit: contain;
    }

    .poster .backdrop_img {
      display: block;
      width: 75%;
      object-fit: contain;
    }

    .poster .dark_overlay > * {
      display: none;
    }
  }
</style>
