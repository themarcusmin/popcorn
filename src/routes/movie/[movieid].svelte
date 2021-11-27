<script context="module">
  import { Search } from '$api/api';

  export async function load({ page }) {
    const { movieid } = page.params;
    const movieData = await Search.getMovie(movieid);
    console.log('new data');
    return {
      props: {
        movieData
      }
    };
  }
  // query if movie belongs to favorite
  // filter recommendations to remove watched movies
</script>

<script lang="ts">
  // import { onMount } from 'svelte';
  import type { GenreType, MovieType, VideoType } from '$models/movie.interface';

  export let movieData: MovieType;
  // $: console.log({ movieData });

  // onMount(() => {
  //   console.log('mounted', movieData.title);
  // });

  import Poster from '$lib/common/Poster.svelte';
  import Details from '$lib/common/Details.svelte';
  import Trailer from '$lib/common/Trailer.svelte';
  import Recommendations from '$lib/common/Recommendations.svelte';
  import Cast from '$lib/common/Cast.svelte';

  const {
    title,
    original_title,
    backdrop_path,
    poster_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
    overview,
    credits: { cast },
    videos: { results: videosResults },
    recommendations: { results: recommendationsResults }
  } = movieData;

  // isFavorite: query for isfavorite status
  let isFavorite: boolean = false;

  // RELEASE YEAR
  function getYear(date: string): string {
    return date?.split('-')[0];
  }

  const release_year: string = getYear(release_date);

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
    {`${title} | Popcorn`}
  </title>
</svelte:head>

<div class="movie_container">
  <Poster {poster_path} {backdrop_path} {title} {original_title} {release_year} {runtime} />

  <Details
    {isFavorite}
    {title}
    {original_title}
    {release_year}
    {runtime}
    {vote_average}
    {vote_count}
    {all_genres}
    {overview}
  />

  <Cast {cast} />

  <Trailer title={officialTrailer.name} ytKey={officialTrailer.key} />

  <Recommendations {recommendationsResults} />
</div>

<style>
  .movie_container {
    padding-bottom: 4em;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .movie_container {
      padding-right: 3em;
      padding-left: 3em;
    }
  }

  @media (min-width: 1025px) {
    .movie_container {
      padding-right: 4em;
      padding-left: 4em;
    }
  }
</style>
