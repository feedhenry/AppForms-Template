/*global module:false*/
module.exports = function(grunt) {

  grunt.task.registerHelper('jsFiles', function() {
    grunt.log.writeln('jsFiles starting');

    var cheerio = require('cheerio');
    var fs = require('fs');

    var scripts = [];
    var $ = cheerio.load(fs.readFileSync('./client/default/index.html'));
    $('script').each(function (index, el) {
      var src = $(el).attr('src');
      if (src != null) {
        scripts.push('./client/default/' + src);
      }
    });

    grunt.log.writeln('scripts in index.html:' + JSON.stringify(scripts));
    return scripts;
  });

  var jsFiles = grunt.helper('jsFiles');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* https://github.com/feedhenry/Wufoo-Template/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'FeedHenry */'
    },
    lint: {
      files: ['grunt.js', './client/default/js/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner>'].concat(jsFiles),
        dest: 'dist-dev/main.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist-prod/main.min.js'
      }
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
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {
      mangle: false
    }
  });

  grunt.registerTask('clean', 'Clean up files/folders', function () {
    var wrench = require('wrench');

    wrench.rmdirSyncRecursive('./dist-dev', true);
    wrench.rmdirSyncRecursive('./dist-prod', true);
  });

  grunt.registerTask('index', 'Copy and modify index.html file for use with dist stuff', function () {
    var cheerio = require('cheerio');
    var fs = require('fs');

    var $ = cheerio.load(fs.readFileSync('./client/default/index.html'));

    // remove script tags with a src
    $('script').each(function (index, el) {
      var src = $(el).attr('src');
      if (src != null) {
        $(el).remove();
      }
    });

    // append script tag with appropirate src
    var htmlDev = $.root().append('<script src="main.js"></script>').html();
    $('script[src="main.js"]').attr('src', 'main.min.js');
    var htmlProd = $.html();

    // write index files
    fs.writeFileSync('./dist-dev/index.html', htmlDev);
    fs.writeFileSync('./dist-prod/index.html', htmlProd);
    grunt.log.writeln('index copied and modified');
  });

  grunt.registerTask('copy', 'Copy stuff to dist folder', function () {
    var wrench = require('wrench');

    // create dist dirs
    wrench.mkdirSyncRecursive('./dist-dev/css', '0777');
    wrench.mkdirSyncRecursive('./dist-dev/img', '0777');
    wrench.mkdirSyncRecursive('./dist-prod/css', '0777');
    wrench.mkdirSyncRecursive('./dist-prod/img', '0777');
    grunt.log.writeln('dist dirs created');

    // copy dist stuff
    var opts = {
      preserve: true
    };
    wrench.copyDirSyncRecursive('./client/default/css', './dist-dev/css', opts);
    wrench.copyDirSyncRecursive('./client/default/css', './dist-prod/css', opts);
    wrench.copyDirSyncRecursive('./client/default/img', './dist-dev/img', opts);
    wrench.copyDirSyncRecursive('./client/default/img', './dist-prod/img', opts);
    grunt.log.writeln('dist stuff copied');
  });

  // Default task.
  grunt.registerTask('default', 'clean lint concat min index copy');

};
