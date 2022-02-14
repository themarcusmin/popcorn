<script lang="ts">
  import { supabase } from '$supabase/supabaseClient';

  let emailSent = false;
  let loading = false;
  let email: string = '';

  let errorMessage: string = '';

  const handleLogin = async (): Promise<void> => {
    try {
      loading = true;
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error) {
      errorMessage = error.message || error.description;
    } finally {
      loading = false;
      emailSent = true;
    }
  };
</script>

<svelte:head>
  <title>Login | Popcorn</title>
</svelte:head>

<form on:submit|preventDefault={handleLogin}>
  <h1>POPCORN</h1>
  <h3>Login to Your Account</h3>
  {#if emailSent}
    <div class="email_sent">A link has been sent to {email}.</div>
  {:else}
    <input placeholder="Email" type="email" bind:value={email} />
    <button type="submit" class={loading ? 'button--loading' : ''}>
      {loading ? 'Loading' : 'Send me a magic link'}
    </button>
  {/if}
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
    position: relative;
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

  form .email_sent {
    color: darkorange;
  }

  /* Spinner for loading button */
  .button--loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 3.5em;
    /* right: 0; */
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
  }

  @keyframes button-loading-spinner {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(1turn);
    }
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
