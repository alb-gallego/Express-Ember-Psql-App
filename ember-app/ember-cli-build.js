'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
//postcss + plugins
const PostcssImport = require('postcss-import');
const PostcssNested = require('postcss-nested');
const Autoprefixer = require('autoprefixer');
const Tailwindcss = require('tailwindcss');
let cssModulesPlugins = [
  PostcssImport({ path: ['node_modules'], filter: (url) => url !== 'custom-tippy-elements.css' }),
  Tailwindcss('./tailwind.config.js'),
  PostcssNested,
  Autoprefixer({
    overrideBrowserslist: require('./config/targets').browsers,
  }),
];




module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [Autoprefixer, Tailwindcss('./tailwind.config.js')],
      },
    },
    cssModules: {
      plugins: cssModulesPlugins,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
