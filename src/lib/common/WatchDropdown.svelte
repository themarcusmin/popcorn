<script lang="ts">
  import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';
  import IoIosArrowDown from 'svelte-icons/io/IoIosArrowDown.svelte';

  let index: number;

  if (true) {
    index = 0;
  }

  let status = [
    {
      watched: false,
      text: 'Add to Watchlist',
      option: 'Watched'
    },
    {
      watched: true,
      text: 'Watched',
      option: 'Clear'
    },
    { watched: null, text: 'To watch', option: 'Watched' }
  ];

  $: currentStatus = status[index];

  let dropdown: boolean = false;

  const toggleDropdown = (): void => {
    dropdown = !dropdown;
  };

  const addToWatchlist = (): void => {
    index = 2;
  };

  const handleOption = (): void => {
    toggleDropdown();
    if (currentStatus.option === 'Watched') {
      index = 1;
    } else {
      index = 0;
    }
  };
</script>

<div class="container">
  <button
    class="first"
    class:active={currentStatus.text === 'Watched' || currentStatus.text === 'To watch'}
    on:click={addToWatchlist}
  >
    {#if currentStatus.watched === false}
      <div class="icon">
        <IoIosAdd />
      </div>
    {/if}
    <div>{currentStatus.text}</div>
  </button>
  <button class="toggle" on:click={toggleDropdown}>
    <div class="downarrow" class:active={dropdown}>
      <IoIosArrowDown />
    </div>
  </button>
  <ul class:active={dropdown} on:click={handleOption}>
    <li>{currentStatus.option}</li>
  </ul>
</div>

<style>
  .container {
    position: relative;
    display: flex;
    gap: 0.5em;
  }

  .container button {
    background-color: inherit;
    color: white;
    box-sizing: border-box;
    border: 1px solid gray;
    border-radius: 0.25em;
    display: flex;
    align-items: center;
  }

  .container .first {
    height: 3em;
    width: 85%;
    padding: 0.5em 1em;
    gap: 0.5em;
    font-size: medium;
    transition: transform 0.2s;
  }

  .container .first:hover,
  .first:active {
    background-color: #404040;
    border-color: #404040;
  }

  .container .first .icon {
    width: 2em;
    height: 2em;
  }

  .container .first.active {
    background-color: #404040;
    border-color: #404040;
    color: lightgray;
    padding: 1em 1.5em;
    font-size: medium;
  }

  .container .toggle {
    width: 15%;
    padding: 0.5em;
    justify-content: center;
  }

  .container .toggle .downarrow {
    width: 1.5em;
    height: 1.5em;
    -moz-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
  }

  .container .toggle .downarrow.active {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .container ul {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    left: 0;
    top: calc(100% + 0.25em);
    background-color: #0a1014;
    color: white;
    list-style: none;
    padding: 0.75em;
    border: 1px solid gray;
    border-radius: 0.25em;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-0.5em);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
    cursor: pointer;
  }

  .container ul.active {
    opacity: 1;
  }

  .container ul:hover,
  ul:active {
    background: #404040;
    border-color: #404040;
  }

  @media (min-width: 768px) {
    .container {
      margin-top: -4.5em;
      justify-content: flex-end;
    }

    .container .first {
      width: 32%;
    }

    .container .toggle {
      width: 8%;
    }

    .container ul {
      left: auto;
      width: calc(32% + 8% + 0.5em);
    }
  }

  @media (min-width: 1025px) {
    .container .first {
      width: 25%;
    }

    .container .toggle {
      width: 5%;
    }

    .container ul {
      left: auto;
      width: calc(25% + 5% + 0.5em);
    }
  }
</style>
