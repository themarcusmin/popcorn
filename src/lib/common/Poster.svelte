<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';

  export let poster_path: string;
  export let backdrop_path: string;
  export let title: string;
  export let original_title: string;
  export let release_year: string;
  export let runtime: number;
</script>

<div class="poster">
  <img class="poster_img" src={`${IMAGE_URL}${poster_path}`} alt={title} />
  <img class="backdrop_img" src={`${IMAGE_URL}${backdrop_path}`} alt={title} />
  <div class="dark_overlay">
    {#if title.length > 12 || original_title.length > 12}
      <div class="title_long">{title || original_title}</div>
    {:else}
      <div class="title">{title || original_title}</div>
    {/if}
    <span>{`${release_year} · ${runtime} min`}</span>
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
    color: gray;
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

  /* and (max-width: 1024px) */
  /* @media (min-width: 1025px) {
    .poster {
      height: 30em;
      display: flex;
      gap: 1em;
      background-color: inherit;
    }

    .poster .backdrop_img {
      display: block;
      height: 100%;
      object-fit: cover;
    }

    .poster .poster_img {
      display: block;
      width: auto;
      height: 100%;
      object-fit: cover;
    }

    .poster .dark_overlay > * {
      display: none;
    } */
</style>
