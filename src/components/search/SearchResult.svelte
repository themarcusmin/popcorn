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
      }
    ]
  };
  let results = data.results;
</script>

<div class="card_container">
  {#each results as { title, media_type, year, poster_img }}
    <div class="card">
      <img src={`${image_url}${poster_img}`} alt={title} />
      <div class="info">
        <div class="media_type">{media_type}</div>
        <div class="title">{title}</div>
        <div class="release_year">{year}</div>
      </div>
    </div>
  {/each}
</div>
{#if data.page < data.total_pages}
  <div class="load_more">Load More</div>
{/if}

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
    height: 100%;
  }

  .load_more {
    margin: 0.5em 1em;
    text-align: center;
    border-radius: 0.5em;
    padding: 0.5em;
    border: 2px solid gray;
  }

  .load_more:active,
  .load_more:hover {
    background: #3a3b3c;
    border-color: #3a3b3c;
  }
</style>
