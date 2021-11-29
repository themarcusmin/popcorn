<script context="module">
  import { Search } from '$api/api';

  export async function load({ page }) {
    const { tvid } = page.params;
    const tvData = await Search.getTv(tvid);
    return {
      props: {
        tvData
      }
    };
  }
  // query for isFavorite
  // filter recommendations to remove watched tvs
</script>

<script lang="ts">
  import type { GenreType, VideoType } from '$models/media.interface';
  import type { TvType } from '$models/tv.interface';

  import Poster from '$lib/common/Poster.svelte';
  import Details from '$lib/common/Details.svelte';
  import Cast from '$lib/common/Cast.svelte';
  import Trailer from '$lib/common/Trailer.svelte';
  import Recommendations from '$lib/common/Recommendations.svelte';

  export let tvData: TvType;

  const {
    name,
    backdrop_path,
    poster_path,
    number_of_seasons,
    first_air_date,
    last_air_date,
    vote_average,
    vote_count,
    genres,
    overview,
    credits: { cast },
    videos: { results: videosResults },
    recommendations: { results: recommendationsResults }
  } = tvData;

  // isFavorite: query for isfavorite status
  let isFavorite: boolean = false;

  // RELEASE YEAR
  function getYear(date: string): string {
    return date?.split('-')[0];
  }

  const release_year_tv: string = `${getYear(first_air_date)}-${getYear(last_air_date)}`;

  // GENRE
  function getGenres(genres: GenreType[]): string {
    return genres
      .map((genre) => genre.name)
      .sort()
      .join('/');
  }

  const all_genres: string = getGenres(genres);

  // TRAILER
  function getMostRecentTrailer(videosResults: VideoType[]): VideoType {
    if (!videosResults.length) {
      return null;
    }

    let ytTrailer: VideoType[] = videosResults.filter(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return ytTrailer
      .sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
      .reverse()[0];
  }

  const officialTrailer: VideoType = getMostRecentTrailer(videosResults);
</script>

<svelte:head>
  <title>
    {`${name} | Popcorn`}
  </title>
</svelte:head>

<div class="tv_container">
  <Poster {poster_path} {backdrop_path} title={name} {release_year_tv} {number_of_seasons} />

  <Details
    {isFavorite}
    title={name}
    {release_year_tv}
    {number_of_seasons}
    {vote_average}
    {vote_count}
    {all_genres}
    {overview}
  />

  {#if cast.length}
    <Cast {cast} />
  {/if}

  {#if officialTrailer}
    <Trailer title={officialTrailer.name} ytKey={officialTrailer.key} />
  {/if}

  {#if recommendationsResults.length}
    <Recommendations {recommendationsResults} />
  {/if}
</div>

<style>
  .tv_container {
    padding-bottom: 4em;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .tv_container {
      padding-right: 3em;
      padding-left: 3em;
    }
  }

  @media (min-width: 1025px) {
    .tv_container {
      padding-right: 4em;
      padding-left: 4em;
    }
  }
</style>
