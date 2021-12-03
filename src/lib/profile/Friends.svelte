<script lang="ts">
  import type { FriendType } from '$models/profile.interface';

  export let friends: FriendType[];
</script>

<ul>
  <h3>Friends</h3>
  {#each friends as { name, friends_count }}
    <li>
      <div>{name}</div>
      <span>{friends_count} {`friend${[0, 1].includes(friends_count) ? '' : 's'}`}</span>
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 0 2em 1em;
  }

  ul h3 {
    margin: 0.5em;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    padding: 1em 1em;
    border-bottom: 0.5px solid gray;
  }

  ul li span {
    color: var(--text-color);
  }
</style>
