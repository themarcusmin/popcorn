<script>
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
</script>

<footer>
  <a href="https://github.com/themarcusmin/" target="_blank" class="about">about</a>
  <a href="https://github.com/themarcusmin/popcorn" target="_blank" class="icon">
    <FaGithub />
  </a>
</footer>

<style>
  footer {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #858585;
  }

  .about {
    font-size: 1.5em;
    margin: 0;
  }

  .icon {
    font-size: 1.25em;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    footer {
      padding: 1em 3em;
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    footer {
      padding: 1em 4em;
    }
  }

  @media (min-width: 1281px) {
    footer {
      padding: 1em 6em;
    }
  }
</style>
