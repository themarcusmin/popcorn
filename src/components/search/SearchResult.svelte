<script>
  let image_url = 'https://image.tmdb.org/t/p/original';

  let data = {
    page: 1,
    total_pages: 8,
    total_results: 158,
    results: [
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      },
      {
        title: 'Dune Dune',
        media_type: 'Movie',
        year: 2021,
        poster_img: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
      }
    ]
  };
  let results = data.results;

  let show = new Array(results.length).fill(false);

  // Toggle detail panel for desktops and laptops
  const handleShowPanel = (index) => {
    show[index] = true;
  };
  const handleHidePanel = (index) => {
    show[index] = false;
  };
</script>

<div class="card_container">
  {#each results as { title, media_type, year, poster_img }, i}
    <div
      class="card"
      on:mouseenter={() => handleShowPanel(i)}
      on:mouseleave={() => handleHidePanel(i)}
    >
      <img src={`${image_url}${poster_img}`} alt={title} />
      <div class="info">
        <div class="media_type">{media_type}</div>
        <div class="title">{title}</div>
        <div class="release_year">{year}</div>
      </div>
      <div class="info_desktop" class:showdetail={show[i]}>
        <div>{media_type}</div>
        <div>
          <div class="title">{title}</div>
          <div>{year}</div>
        </div>
      </div>
    </div>
  {/each}
  {#if data.page < data.total_pages}
    <div class="card view_more">View More</div>
  {/if}
</div>

<style>
  .card_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding: 1em;
  }

  .card_container .card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 0.25em;
  }

  .card_container .card:active {
    outline: 2px solid darkorange;
  }

  /* Hidden Desktop Info Panel */
  .card_container .card .info_desktop {
    display: none;
  }

  /* Mobile Info Panel */
  .card_container .card .info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .card_container .card .info .media_type {
    font-size: small;
    color: lightgray;
    padding: 0.75em 0.5em 0 0.5em;
  }

  .card_container .card .info .title {
    font-size: large;
    color: white;
    padding: 0em 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .card_container .card .info .release_year {
    font-size: small;
    color: lightgray;
    padding: 0 0.5em 0.75em 0.5em;
  }

  .card_container div img {
    width: 100%;
    /* height: 100%; */
  }

  .card_container .view_more {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1b1c;
  }

  .card_container .view_more:hover {
    background: #3a3b3c;
    color: darkorange;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 1em 3em;
    }
  }

  @media (min-width: 1025px) {
    .card .info {
      display: none !important; /* Remove detail panel for non-desktop devices */
    }

    .showdetail {
      display: flex !important; /* Hover to show detail panel for desktops and laptops*/
    }

    .card_container .card .info_desktop {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      background: #1d1d1dbf;
    }

    .card_container .card .info_desktop > * {
      padding: 1em;
      color: darkgray;
    }

    .card_container .card .info_desktop .title {
      font-size: x-large;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4; /* number of lines to show */
      line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 1em 4em;
    }
  }

  @media (min-width: 1281px) {
    .card_container {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 1.5em;
      padding: 2em 6em;
    }
  }
</style>
