<script context="module">
  export async function load({ page }) {
    const { profileid } = page.params;

    // Get request to get friends of [profileid]
    // Example json data
    const friends = [
      { name: 'The Viper', friends_count: 30 },
      { name: 'The Mountain', friends_count: 0 },
      { name: 'Faceless Man', friends_count: 5 },
      { name: 'Sir Davos', friends_count: 50 },
      { name: 'Tyrion Lannister', friends_count: 100 }
    ];
    return {
      props: { friends }
    };
  }
</script>

<script lang="ts">
  import type { FriendType } from '$models/profile.interface';
  import Friends from '$lib/profile/Friends.svelte';

  export let friends: FriendType[];
</script>

<Friends {friends} />
