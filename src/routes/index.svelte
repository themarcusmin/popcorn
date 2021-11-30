<script context="module">
  export async function load() {
    const trendingTvData = await Search.getTrending('tv');
    const trendingMovieData = await Search.getTrending('movie');
    return {
      props: {
        trendingTvData,
        trendingMovieData
      }
    };
  }
</script>

<script lang="ts">
  // trending result
  import Trending from '$lib/home/Trending.svelte';

  export let trendingTvData: SearchResponseType;
  export let trendingMovieData: SearchResponseType;

  const { results: trendingTvResults } = trendingTvData;
  const { results: trendingMovieResults } = trendingMovieData;

  console.log({ trendingTvData });
  console.log({ trendingMovieData });

  // search result
  import SearchInput from '$lib/home/SearchInput.svelte';
  import SearchResult from '$lib/home/SearchResult.svelte';

  import { Search } from '$api/api';
  import type { SearchResponseType } from '$models/searchresponse.interface';

  let initialData = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  };

  let data: SearchResponseType = initialData;

  let query: string = '';

  let timer: ReturnType<typeof setTimeout>;
  let debounceDelay: number = 500;

  const debounceSearchRequest = (event): void => {
    clearTimeout(timer);
    timer = setTimeout(async (): Promise<void> => {
      let query: string = event.target.value;
      let trimmedQuery: string = query.trim();
      if (!trimmedQuery.length) {
        data = initialData;
        return;
      }
      data = await Search.searchKeyword(trimmedQuery);
    }, debounceDelay);
  };

  const handleViewMore = async () => {
    data.page++;
    let newData = await Search.searchKeyword(query, data.page);
    data.results = [...data.results, ...newData.results];
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<SearchInput onChange={(newValue) => (query = newValue)} {debounceSearchRequest} />

{#if !data.page}
  <br />
  <Trending title="Trending Movies" trendingResults={trendingMovieResults} />
  <Trending title="Trending TV Shows" trendingResults={trendingTvResults} />
{/if}

<SearchResult {data} on:viewmore={handleViewMore} />
