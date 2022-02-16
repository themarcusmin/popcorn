<script lang="ts">
  // Check for session
  import { supabase } from '$supabase/supabaseClient';
  const session = supabase.auth.session();

  // Animation
  import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';

  let animate = false;

  const animateAndUpdateButton = () => {
    animate = false;
    animate = true;
    setTimeout(() => (animate = false), 700);
    if (index === options.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  };

  let index = 0;

  let options = [
    { status: 'unwatched', text: 'Add to Watchlist' },
    { status: 'towatch', text: 'To Watch' },
    { status: 'watched', text: 'Watched' }
  ];

  $: currentStatus = options[index];
</script>

<div class="container">
  {#if !session}
    <a href="/login" class="first">
      <div class="icon">
        <IoIosAdd />
      </div>
      <div>Add to Watchlist</div>
    </a>
  {:else}
    <button
      class="bubbly-button"
      class:animate
      class:towatch={currentStatus.status === 'towatch'}
      class:watched={currentStatus.status === 'watched'}
      on:click={animateAndUpdateButton}
    >
      {#if !index}
        <div class="icon">
          <IoIosAdd />
        </div>
      {/if}
      <div>{currentStatus.text}</div>
    </button>
  {/if}
</div>

<style>
  :root {
    --button-watched-color: darkorange;
    --button-towatch-color: #ffb000;
  }

  .container {
    position: relative;
    display: flex;
    gap: 0.5em;
  }

  /* Credit: https://codepen.io/nourabusoud/pen/ypZzMM */
  button {
    width: 100%;
    font-family: 'Helvetica', 'Arial', sans-serif;
    display: flex;
    align-items: center;
    font-size: medium;
    padding: 0.5em 1em;
    height: 3em;
    -webkit-appearance: none;
    appearance: none;
    background-color: inherit;
    color: #fff;
    border-radius: 0.4em;
    box-sizing: border-box;
    border: 1px solid gray;
    cursor: pointer;
    position: relative;
    transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  }

  button:hover {
    transform: scale(0.95);
  }

  .towatch {
    background-color: var(--button-towatch-color);
    border-color: var(--button-towatch-color);
    color: black;
    justify-content: center;
    letter-spacing: 0.1em;
  }

  .watched {
    background-color: var(--button-watched-color);
    border-color: var(--button-watched-color);
    color: black;
    justify-content: center;
    letter-spacing: 0.1em;
  }

  .icon {
    width: 2em;
    height: 2em;
  }

  @media (min-width: 525px) {
    button {
      width: 45%;
    }
  }

  @media (min-width: 768px) {
    .container {
      justify-content: flex-end;
      margin-top: -4.25em;
    }

    button {
      width: 32%;
    }
  }

  @media (min-width: 1025px) {
    button {
      width: 24%;
    }
  }

  @media (min-width: 1281px) {
    button {
      width: 22%;
    }
  }

  .bubbly-button:focus {
    outline: 0;
  }

  .bubbly-button:before,
  .bubbly-button:after {
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  .bubbly-button:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, var(--button-watched-color) 20%, transparent 30%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, var(--button-watched-color) 15%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  }

  .bubbly-button:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, var(--button-watched-color) 15%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%),
      radial-gradient(circle, var(--button-watched-color) 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  }

  .bubbly-button:active {
    transform: scale(0.9);
    background-color: var(--button-watched-color);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }

  /* .bubbly-button */
  .animate:before {
    display: block;
    animation: topBubbles ease-in-out 0.75s forwards;
  }

  /* .bubbly-button */
  .animate:after {
    display: block;
    animation: bottomBubbles ease-in-out 0.75s forwards;
  }

  @keyframes topBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
        70% 90%;
    }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
        90% 30%;
    }
    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
        90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  @keyframes bottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
    }
    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
    }
    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }
</style>
