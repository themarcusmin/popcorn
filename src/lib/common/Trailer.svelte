<script lang="ts">
  export let title: string;
  export let ytKey: string;
</script>

<div class="video_container">
  <div class="video_wrapper">
    <iframe
      {title}
      id="ytplayer"
      width="560"
      height="315"
      type="text/html"
      src={`https://www.youtube.com/embed/${ytKey}`}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</div>

<style>
  .video_container {
    padding: 1em 0;
    padding-bottom: 4%;
  }

  .video_wrapper {
    position: relative;
    overflow: hidden;
    max-width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }

  .video_wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  @media (min-width: 768px) {
    .video_wrapper {
      margin: 0 6em;
    }
  }

  @media (min-width: 1025px) {
    .video_wrapper {
      margin: 0 10em;
    }
  }
</style>
