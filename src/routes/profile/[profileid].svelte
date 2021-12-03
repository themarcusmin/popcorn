<script lang="ts">
  import Stats from '$lib/profile/Stats.svelte';

  let profileName: string = 'John Wick';
</script>

<svelte:head>
  <title>
    {`${profileName} | Profile`}
  </title>
</svelte:head>

<Stats genres="Comedy, Thriller, Action" watchedMovies={22} watchedTVShows={10} />
