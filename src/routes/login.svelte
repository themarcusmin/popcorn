<script lang="ts">
  let errorMessage: string = '';

  const handleSubmit = (): void => {
    console.log('Logging in');
  };
</script>

<svelte:head>
  <title>Login | Popcorn</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <h1>POPCORN</h1>
  <h3>Login to Your Account</h3>
  <input placeholder="Email" type="email" />
  <input placeholder="Password" type="password" />
  <button type="submit">Login</button>
  <div class="register">
    <a href="/register">Need an account? Register</a>
  </div>
  <label for="error_message"><strong>{errorMessage}</strong></label>
</form>

<style>
  form {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: auto;
    padding-bottom: 4em;
  }

  form h1 {
    text-align: center;
    letter-spacing: 0.25em;
    margin: 0;
  }

  form h3 {
    margin: 0.5em;
  }

  form input {
    font-size: medium;
    padding: 1em;
    border-radius: 1em;
    border: none;
  }

  form button {
    font-size: medium;
    border-radius: 1em;
    border: none;
    padding: 0.75em;
    background: darkorange;
    color: white;
    transition: transform 0.2s;
  }

  form button:active {
    transform: scale(0.95);
    filter: brightness(85%);
  }

  form .register {
    text-align: center;
    border-top: 1px solid gray;
    padding: 1em 0;
    margin-top: 0.75em;
  }

  form label {
    text-align: center;
    color: red;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    form {
      width: 45%;
    }
  }

  @media (min-width: 1025px) {
    form {
      width: 27.5%;
    }
  }
</style>
