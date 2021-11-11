import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-netlify';
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $api: path.resolve('./src/api'),
          $components: path.resolve('./src/components'),
          $models: path.resolve('./src/models')
        }
      }
    }
  }
};

export default config;
