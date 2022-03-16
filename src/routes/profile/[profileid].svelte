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

  export let username: string;
  export let id: string;

  import Toggler from '$lib/profile/Toggler.svelte';
  import Heatmap from '$lib/profile/Heatmap.svelte';
</script>

<svelte:head>
  <title>
    {`${username} | Profile`}
  </title>
</svelte:head>

<Heatmap userid={id} />
<Toggler userid={id} />
