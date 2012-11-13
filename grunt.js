/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! FeedHenry Wufoo App Generator - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* https://github.com/feedhenry/Wufoo-Template/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'FeedHenry */'
    },
    lint: {
      files: ['grunt.js', 'client/default/js/**/*.js']
    },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    // concat: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<file_strip_banner:lib/FILE_NAME.js>'],
    //     dest: 'dist/FILE_NAME.js'
    //   }
    // },
    // min: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
    //     dest: 'dist/FILE_NAME.min.js'
    //   }
    // },
    // watch: {
    //   files: '<config:lint.files>',
    //   tasks: 'lint qunit'
    // },
    jshint: {
      options: {
        predef: [
          'Backbone'
        ],
        eqeqeq: false,
        eqnull: true,
        sub: true,
        devel: false,
        browser: true,
        smarttabs: false,
        laxbreak: true,
        laxcomma: true,
        jquery: true,
        loopfunc: true
      },/*{
        // curly: true,
        // eqeqeq: true,
        // immed: true,
        // latedef: true,
        // newcap: true,
        // noarg: true,
        // sub: true,
        // undef: true,
        // boss: true,
        // eqnull: true,
        // browser: true
      },*/
      globals: {
        jQuery: true
      }
    }/*,
    uglify: {}*/
  });

  // Default task.
  grunt.registerTask('default', 'lint');// 'lint qunit concat min');

};
