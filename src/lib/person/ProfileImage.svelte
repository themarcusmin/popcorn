<script lang="ts">
  import { IMAGE_URL } from '$lib/constants';
  export let profile_path: string;
  export let name: string;
</script>

<img src={`${IMAGE_URL}${profile_path}`} alt={name} />

<style>
  img {
    width: 100%;
    border-radius: 0.5em;
  }
</style>
