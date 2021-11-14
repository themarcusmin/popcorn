<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  import GiPopcorn from 'svelte-icons/gi/GiPopcorn.svelte';
  import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
  import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte';

  import { Search } from '$api/api';
  import SearchResult from '$components/search/SearchResult.svelte';
  import SideMenu from '$components/navigation/SideMenu.svelte';
  import Footer from '$components/footer/Footer.svelte';

  // let opacity: number = 0.5,
  //   delay: number = 300;

  // let query: string = '';

  // const handleSearch = async (): Promise<void> => {
  //   console.log(query);
  //   const data = await Search.searchKeyword(query);
  //   console.log({ data });
  // };

  let timer: ReturnType<typeof setTimeout>;
  let debounceDelay: number = 500;

  const debounceSearchRequest = (event) => {
    clearTimeout(timer);
    timer = setTimeout(async (): Promise<void> => {
      let query: string = event.target.value;
      const data = await Search.searchKeyword(query.trim());
      console.log({ data });
    }, debounceDelay);
  };

  //: Promise<void>
  const handleKeyUp = async () => {
    // if (event.charCode === 13) {
    //   event.preventDefault();
    //   handleSearch();
    // }
    // debounce(query);
    // if (query.trim().length > 0) {
    //   const data = await Search.searchKeyword(query);
    //   console.log({ data });
    // }
  };

  // const sample = {
  //   adult: false,
  //   backdrop_path: '/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg',
  //   genre_ids: [878, 12],
  //   id: 438631,
  //   media_type: 'movie',
  //   original_language: 'en',
  //   original_title: 'Dune',
  //   overview:
  //     "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
  //   popularity: 2911.423,
  //   poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  //   release_date: '2021-09-15',
  //   title: 'Dune',
  //   video: false,
  //   vote_average: 8,
  //   vote_count: 3632
  // };

  let showMenu: boolean = false;

  const handleToggleMenu = (): void => {
    showMenu = !showMenu;
  };

  // Search API
  // let data = {
  //   page: 1,
  //   total_pages: 8,
  //   total_results: 158,
  //   results: [
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     },
  //     {
  //       title: 'Dune Dune',
  //       media_type: 'Movie',
  //       year: 2021,
  //       poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
  //     }
  //   ]
  // };
  let data;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<SideMenu {showMenu} {handleToggleMenu} />

<main>
  <header>
    <div class="header_icon">
      <GiPopcorn />
    </div>
    <div class="header_icon" on:click={handleToggleMenu} out:fade>
      <IoIosMenu />
    </div>
  </header>

  <div class="search_container" transition:fly={{ x: 375 }}>
    <form>
      <div>
        <IoIosSearch />
      </div>
      <input
        on:input={debounceSearchRequest}
        placeholder="Search movies, tv or stars"
        type="text"
      />
    </form>
  </div>

  <SearchResult {data} />

  <Footer />
</main>

<style>
  :global(body) {
    background-color: #0a1014;
    color: white;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  :global(.icon) {
    width: 2.5em;
    height: 2.5em;
  }

  main {
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
    position: relative;
    min-height: 100vh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #0a1014;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
  }

  .header_icon {
    width: 2.5em;
    height: 2.5em;
    cursor: pointer;
  }

  .header_icon:hover,
  .header_icon:active {
    color: darkorange;
  }

  /* SEARCH CONTAINER */
  .search_container {
    display: grid;
    padding: 0.2em 1em;
  }

  .search_container form {
    grid-area: 1/1/2/2;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    header {
      padding: 1em 3em;
    }
    .search_container {
      padding: 0.2em 3em;
    }
  }

  @media (min-width: 1025px) {
    header {
      padding: 1em 4em;
    }
    .search_container {
      padding: 0.2em 4em;
    }
  }

  @media (min-width: 1281px) {
    header {
      padding: 1em 6em;
    }
    .search_container {
      padding: 0.5em 6em;
    }
  }

  form {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
  }

  form div {
    position: absolute;
    color: gray;
    left: 1.5em;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 2em;
    width: 2em;
  }

  form input {
    font-size: medium;
    padding-left: 2.75em;
    width: 100%;
    height: 2.75em;
    box-sizing: border-box;
    border-radius: 0.75em;
    border: none;
    outline: none;
  }

  form input:focus {
    outline: 3px solid darkorange;
  }
</style>
