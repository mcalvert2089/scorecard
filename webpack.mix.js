const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var tailwindcss = require('tailwindcss');

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/css/styles.scss', 'public/css')
   .options({
    processCssUrls: false,
    postCss: [ tailwindcss('./tailwind.js') ],
  });
