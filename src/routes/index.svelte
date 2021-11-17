<script lang="ts">
  import SearchInput from '$lib/search/SearchInput.svelte';
  import SearchResult from '$lib/search/SearchResult.svelte';

  import { Search } from '$api/api';
  import type { SearchResponseType } from '$models/searchresponse.interface';

  let data: SearchResponseType = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  };

  let query: string = '';

  let timer: ReturnType<typeof setTimeout>;
  let debounceDelay: number = 500;

  const debounceSearchRequest = (event): void => {
    clearTimeout(timer);
    timer = setTimeout(async (): Promise<void> => {
      let query: string = event.target.value;
      let trimmedQuery: string = query.trim();
      if (!trimmedQuery.length) return;
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
  <div>New releases and recommendations</div>
{/if}

<SearchResult {data} on:viewmore={handleViewMore} />
