<script context="module">
  export async function load({ params }) {
    const { profileid } = params;

    // Query for fullname and email
    const userData = await getUserInfo(profileid);
    const { email, fullname, id, username } = userData;

    return {
      props: {
        email,
        fullname,
        id,
        username
      }
    };
  }
</script>

<script lang="ts">
  import { getUserInfo } from '$api/user';

  // export let email: string;
  // export let fullname: string;
  // export let id: string;
  export let username: string;
  let friendsCount = 0;
  let favoritesCount = 0;
</script>

<main>
  <div>
    <a href={`/profile/${username}`}>
      <h2>{username}</h2>
    </a>
    <div class="minor">
      <a class="friends" href={`/profile/${username}/friends`}>
        <h2>{friendsCount}</h2>
        <span>Friends</span>
      </a>
      <a class="friends" href={`/profile/${username}/favorites`}>
        <h2>{favoritesCount}</h2>
        <span>Favorites</span>
      </a>
    </div>
    <!-- FEATURE: FRIEND -->
    <!-- <button>Add Friend</button> -->
  </div>
  <slot />
</main>

<style>
  main {
    padding-bottom: 4em;
  }

  main div {
    padding: 1em;
  }

  main div h2 {
    text-align: center;
    margin-top: 0;
  }

  main div .minor > * {
    display: inline-block;
    width: 49%;
    text-align: center;
  }

  main div .minor a:first-child {
    border-right: 1px solid gray;
  }

  main div .minor a span {
    color: var(--text-color);
  }

  main div .minor h2 {
    margin: 0;
  }

  /* main div button {
    width: 60%;
    border-radius: 1em;
    margin: 2em 0 0 2em;
    padding: 1em;
    border: 1px solid white;
    background: inherit;
    color: white;
    transition: transform 0.2s;
  }

  main div button:hover {
    background: #4c4c4c;
    border-color: #4c4c4c;
  }

  main div button:active {
    transform: scale(0.95);
  } */

  @media (min-width: 768px) and (max-width: 1024px) {
    main {
      padding-right: 3em;
      padding-left: 3em;
    }

    /* main div button {
      width: 40%;
    } */
  }

  @media (min-width: 1025px) {
    main {
      padding-right: 4em;
      padding-left: 4em;
    }

    /* main div button {
      width: 30%;
    } */
  }
</style>
