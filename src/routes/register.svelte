<script lang="ts">
  let errorMessage: string = '';

  const handleSubmit = (): void => {
    console.log('Registering account');
  };
</script>

<svelte:head>
  <title>Register | Popcorn</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
  <h1>POPCORN</h1>
  <h3>Register Now</h3>
  <input placeholder="Email" type="email" />
  <input placeholder="Name" type="text" />
  <input placeholder="Password" type="password" />
  <input placeholder="Confirm Password" type="password" />
  <button type="submit">Register</button>
  <div class="login">
    <a href="/login">Already Have an Account? Login</a>
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

  form .login {
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
