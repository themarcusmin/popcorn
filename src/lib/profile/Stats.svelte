<script lang="ts">
  export let genres: string = 'No data';
  export let watchedMovies: number = 0;
  export let watchedTVShows: number = 0;
</script>

<div class="stats_container">
  <section>
    <h3>Favorite Genres</h3>
    <p>{genres}</p>
  </section>
  <section>
    <h3>Watched</h3>
    <div>
      <span>Movies</span>
      <p>{watchedMovies}</p>
    </div>
    <div>
      <span>TV Shows</span>
      <p>{watchedTVShows}</p>
    </div>
  </section>
</div>

<style>
  .stats_container {
    padding: 0.5em 2em 1em;
  }

  section {
    margin-bottom: 1.5em;
  }

  section h3 {
    margin: 0;
  }

  section p {
    margin: 1em;
    color: var(--text-color);
  }

  section div {
    margin: 0 0 0 1em;
  }

  section div > * {
    display: inline-block;
  }
</style>
