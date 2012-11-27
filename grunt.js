/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.task.registerHelper('matchFiles', function(re) {
    grunt.log.writeln('matchFiles starting');

    var cheerio = require('cheerio');
    var fs = require('fs');

    var scripts = [];
    var $ = cheerio.load(fs.readFileSync('./client/default/index.html'));
    $('script').each(function (index, el) {
      var src = $(el).attr('src');
      if (src != null && src.match(re)) {
        scripts.push('./client/default/' + src);
      }
    });

    grunt.log.writeln('scripts matching ' + re + ' in index.html:' + JSON.stringify(scripts));
    return scripts;
  });

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
        // NOTE : current match is src not starting with lib (a simpler /^js\// would also work),
        src: ['<banner>'].concat(grunt.helper('matchFiles', /^(?!lib\/)/)),
        dest: 'dist-dev/client/default/main.js'
      },
      lib: {
        src: ['<banner>'].concat(grunt.helper('matchFiles', /^lib\//)),
        dest: 'dist-dev/client/default/lib.js'
      }
    },
    copy: {
      dist: {
        files: {
          'dist/client/default/' : './dist-dev/client/default/main.js'
        }
      }
    },
    min: {
      lib: {
        src: ['<config:concat.lib.dest>'],
        dest: 'dist/client/default/lib.min.js'
      }
    },
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
    var fs = require('fs');

    wrench.rmdirSyncRecursive('./dist', true);
    wrench.rmdirSyncRecursive('./dist-dev', true);
    try {
      fs.unlinkSync('./dist.zip');
    } catch (e) {
      // fail silently
    }
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


    // add the tags and make a dev copy of the html
    $.root().append('<script src="lib.js"></script>\n');
    $.root().append('<script src="main.js"></script>\n');
    var htmlDev = $.root().html();

    // insert the minified files for prod
    $('script[src="lib.js"]').attr('src', 'lib.min.js');
    var htmlProd = $.html();

    // write index files
    fs.writeFileSync('./dist-dev/client/default/index.html', htmlDev);
    fs.writeFileSync('./dist/client/default/index.html', htmlProd);
    grunt.log.writeln('index copied and modified');
  });

  grunt.registerTask('mkdirs', 'Make dirs used for dist stuff', function () {
    var wrench = require('wrench');

    // create dist dirs
    ['./dist-dev/', './dist/'].forEach(function (dir) {
      wrench.mkdirSyncRecursive(dir + 'client/default', '0777');
    });
    grunt.log.writeln('dist dirs created');
  });

  grunt.registerTask('archive', 'Create archive of repo and unzip to temp folder', function () {
    var done = this.async();

    require('child_process').exec('git archive --worktree-attributes -o dist.zip -v HEAD;cd dist;unzip ../dist.zip;cd ..', function (error, stdout, stderr) {
      grunt.log.writeln('stdout: ' + stdout);
      grunt.log.writeln('stderr: ' + stderr);
      if (error !== null) {
        grunt.log.writeln('exec error: ' + error);
        done(1);
      } else {
        done();
      }
    });
  });

  grunt.registerTask('rearchive', 'Rearchive dist folder contents into zip file', function () {
    var done = this.async();

    require('wrench').rmdirSyncRecursive('./dist-dev', true);

    require('child_process').exec('cd dist;zip -r ../dist.zip .;cd ..', function (error, stdout, stderr) {
      grunt.log.writeln('stdout: ' + stdout);
      grunt.log.writeln('stderr: ' + stderr);
      if (error !== null) {
        grunt.log.writeln('exec error: ' + error);
        done(1);
      } else {
        done();
      }
    });
  });

  // Default task.
  grunt.registerTask('default', 'clean lint mkdirs archive concat copy min index rearchive');

};
