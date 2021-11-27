<script lang="ts">
  export let biography: string;

  let bio_para_break = biography.indexOf('\n');

  let bio_first_part = biography.slice(0, bio_para_break);
  let bio_last_part = biography.slice(bio_para_break);

  let showCompleteBio = false;

  const toggleBio = (): void => {
    showCompleteBio = !showCompleteBio;
  };
</script>

<div class="bio">
  <h3>Bio</h3>
  <p>
    {bio_first_part}
    {#if bio_para_break > 0}
      {#if showCompleteBio}
        {bio_last_part}
        <span on:click={toggleBio}>Less</span>
      {:else}
        <span on:click={toggleBio}>More</span>
      {/if}
    {/if}
  </p>
</div>

<style>
  .bio p {
    word-wrap: break-word;
    white-space: pre-wrap;
    color: var(--text-color);
  }

  .bio p::selection {
    color: var(--text-selection-color);
  }

  .bio span {
    display: block;
    margin: 0.5em 0;
    color: white;
    cursor: pointer;
  }

  .bio span:hover,
  span:active {
    color: darkorange;
  }
</style>
