import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */

import vercel from '@sveltejs/adapter-vercel';

const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    adapter: vercel({
      trailingSlash: 'always',
      pages: 'build',
      assets: 'build'
    }),
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: false
    },
    vite: {
      resolve: {
        alias: {
          $api: path.resolve('./src/api'),
          $lib: path.resolve('./src/lib'),
          $models: path.resolve('./src/models'),
          $supabase: path.resolve('./src/supabase'),
          $stores: path.resolve('./src/stores'),
          $utils: path.resolve('./src/utils')
        }
      }
    }
  }
};

export default config;
