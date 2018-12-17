/**
 * `tasks/config/copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/copy.js
 *
 */
module.exports = function (grunt) {
  grunt.config.set('copy', {
    dev: {
      files: [{
          expand: true,
          cwd: './node_modules/vue-chartjs/dist',
          src: ['vue-chartjs.js'],
          dest: 'assets/js/libs/chart',
        },
        {
          expand: true,
          cwd: './node_modules/chart.js/dist',
          src: ['Chart.js'],
          dest: 'assets/js/libs/chart',
        },
        {
          expand: true,
          cwd: './node_modules/bootstrap-vue/dist',
          src: ['bootstrap-vue.js'],
          dest: 'assets/js/libs/bootstrapVue',
        },
        {
          expand: true,
          cwd: './node_modules/vue-animate-number/dist',
          src: ['vue-animate-number.js'],
          dest: 'assets/js/libs/vue-animate-number',
        },
        {
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee|less)'],
          dest: '.tmp/public',
        },
        {
          expand: true,
          cwd: './node_modules/font-awesome/less',
          src: ['*.less'],
          dest: '.tmp/public/styles',
        },
        // {
        //   expand: true,
        //   cwd: './assets/fonts',
        //   src: ['**/*'],
        //   dest: '.tmp/public/fonts',
        // },
      ],
    },
    fonts: {
      files: [
        {
          expand: true,
          flatten: true,
          src: ['./node_modules/font-awesome/fonts'],
          dest: '.tmp/public/fonts'
        }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www',
      }, ],
    },
    beforeLinkBuildProd: {
      files: [{
        expand: true,
        cwd: '.tmp/public/hash',
        src: ['**/*'],
        dest: '.tmp/public/dist',
      }, ],
    },
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // This Grunt plugin is part of the default asset pipeline in Sails,
  // so it's already been automatically loaded for you at this point.
  //
  // Of course, you can always remove this Grunt plugin altogether by
  // deleting this file.  But check this out: you can also use your
  // _own_ custom version of this Grunt plugin.
  //
  // Here's how:
  //
  // 1. Install it as a local dependency of your Sails app:
  //    ```
  //    $ npm install grunt-contrib-copy --save-dev --save-exact
  //    ```
  //
  //
  // 2. Then uncomment the following code:
  //
  // ```
  // // Load Grunt plugin from the node_modules/ folder.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};
