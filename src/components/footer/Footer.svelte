<script>
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
</script>

<footer>
  <p>about</p>
  <div class="icon">
    <FaGithub />
  </div>
</footer>

<style>
  footer {
    margin-top: auto;
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #858585;
  }

  p {
    font-size: large;
    margin: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
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
