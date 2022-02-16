<button class="button--loading">Loading</button>

<style>
  button {
    width: 100%;
    font-family: 'Helvetica', 'Arial', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
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
    position: relative;
  }

  /* Spinner for loading button */
  .button--loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 2.5em;
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

  @media (min-width: 525px) {
    button {
      width: 45%;
    }
  }

  @media (min-width: 768px) {
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
</style>
