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
          $lib: path.resolve('./src/lib'),
          $models: path.resolve('./src/models'),
          $supabase: path.resolve('./src/supabase'),
          $stores: path.resolve('./src/stores')
        }
      }
    }
  }
};

export default config;
