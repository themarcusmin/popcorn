<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';
  import type { CastType } from '$models/movie.interface';
  import IoIosHelpCircle from 'svelte-icons/io/IoIosHelpCircle.svelte'; /* Icon for cast without profile_path */

  export let cast: CastType[];

  const displayCast: number = 3;
  let moreCast: boolean = false;

  const toggleMoreCast = (): void => {
    moreCast = !moreCast;
  };
</script>

<div class="cast">
  <div class="title">Cast</div>
  <div class="cast_container">
    {#each cast.slice(0, displayCast) as { name, id, character, profile_path }}
      <a href={`/people/${id}`}>
        <div class="actor">
          {#if profile_path}
            <img src={`${IMAGE_URL}${profile_path}`} alt={name} />
          {:else}
            <div class="no_profile">
              <IoIosHelpCircle />
            </div>
          {/if}
          <div class="name">
            <div class="realname">{name}</div>
            <div class="screenname">as {character}</div>
          </div>
        </div>
      </a>
    {/each}
    {#if cast.length > displayCast}
      {#if !moreCast}
        <div class="more_fewer">
          <span on:click={toggleMoreCast}>More</span>
        </div>
      {:else}
        {#each cast.slice(displayCast) as { name, id, character, profile_path }}
          <a href={`/people/${id}`}>
            <div class="actor">
              {#if profile_path}
                <img src={`${IMAGE_URL}${profile_path}`} alt={name} />
              {:else}
                <div class="no_profile">
                  <IoIosHelpCircle />
                </div>
              {/if}
              <div class="name">
                <div class="realname">{name}</div>
                <div class="screenname">as {character}</div>
              </div>
            </div>
          </a>
        {/each}
        <div class="more_fewer">
          <span on:click={toggleMoreCast}>Fewer</span>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .cast {
    padding: 0 1.5em;
  }

  .cast .title {
    margin-top: 1em;
    font-size: x-large;
  }

  .cast .cast_container {
    display: flex;
    flex-wrap: wrap;
  }

  .cast .cast_container > * {
    width: 100%;
  }

  .cast .cast_container a {
    display: flex;
  }

  .cast .cast_container a .actor {
    display: flex;
    align-items: center;
    gap: 2em;
  }

  .cast .cast_container a .actor img {
    width: 5em;
    clip-path: circle();
  }

  .cast .cast_container a .actor .no_profile {
    width: 5em;
    color: #cfcfcf;
  }

  .cast .cast_container a .actor .name {
    display: block;
  }

  .cast .cast_container a .actor .name .realname:hover {
    color: gray;
  }

  .cast .cast_container a .actor .name .screenname {
    color: gray;
  }

  .cast .cast_container a .actor .name .screenname:hover {
    text-decoration: underline;
  }

  .cast .cast_container .more_fewer {
    display: flex;
    align-items: center;
    height: 7em;
  }

  .cast .cast_container span {
    color: gray;
    cursor: pointer;
  }

  .cast .cast_container span:hover,
  span:focus {
    color: white;
  }

  @media (min-width: 768px) {
    .cast .cast_container > * {
      width: 50%;
    }
  }
</style>
