<script lang="ts">
  export let title: string;
</script>

<div class="recommendations">
  <div class="title">{title}</div>
  <div class="carousel">
    <slot />
  </div>
</div>

<style>
  .recommendations {
    margin-bottom: 1em;
  }

  .recommendations .title {
    padding: 0 1.5em 0.5em;
    font-size: x-large;
  }

  .recommendations .carousel {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    gap: 1.25em;
    height: auto;
    /* Hide horizontal scrollbar */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  .recommendations .carousel::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .recommendations .carousel {
      margin: 0 -3em;
    }
  }

  @media (min-width: 1025px) {
    .recommendations .carousel {
      margin: 0 -4em;
    }
  }
</style>
