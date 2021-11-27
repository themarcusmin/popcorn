<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';

  export let top_credits;

  function getYear(date: string): string {
    return date.split('-')[0];
  }
</script>

<div class="known_for">
  <h3>Known For</h3>
  <div class="media_container">
    {#each top_credits as { id, media_type, title, release_date, poster_path }}
      <a href={`/${media_type}/${id}`}>
        <div class="media">
          <img src={`${IMAGE_URL}${poster_path}`} alt="title" />
          <div>{title}</div>
          <div class="media_year">{getYear(release_date)}</div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .known_for .media_container {
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
  }

  .known_for .media_container a {
    width: 47.5%;
    margin-bottom: 1em;
  }

  .known_for .media_container a .media > * {
    width: 100%;
  }

  .known_for .media_container .media .media_year {
    font-style: italic;
    color: var(--text-color);
  }

  @media (min-width: 1025px) {
    .known_for .media_container {
      gap: 1em;
    }

    .known_for .media_container a {
      width: 20%;
      margin-bottom: 1em;
    }
  }
</style>
