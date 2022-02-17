<script lang="ts">
  import Stats from '$lib/profile/Stats.svelte';
  import Heatmap from '$lib/profile/Heatmap.svelte';

  let profileName = 'John Wick';
</script>

<svelte:head>
  <title>
    {`${profileName} | Profile`}
  </title>
</svelte:head>

<Stats genres="Comedy, Thriller, Action" watchedMovies={22} watchedTVShows={10} />
<Heatmap />
