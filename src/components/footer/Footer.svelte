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
</style>
