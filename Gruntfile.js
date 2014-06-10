/*global module:false*/
var cheerio = require('cheerio');
var _ = require('underscore');
var fs = require('fs');
var child = require('child_process');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wget');

  var generateBanner = function($, grunt, sha, release) {
    var ul = $('#fh_wufoo_banner .list');
    $(ul).empty();

    // not actually camel case!
    String.prototype.toCamelCase = function() {
      return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    };

    var template = "\n\t<li class='<%= name.toLowerCase()%>'><span><%= name.toCamelCase() %></span>:<span class='value'><%= value %></span></li>";

    var version = grunt.config("pkg.version");
    if (release === false) {
      version = "Candidate " + version;
    }

    $(ul).append(_.template(template, {
      name: "device",
      value: ""
    }));
    $(ul).append(_.template(template, {
      name: "name",
      value: grunt.config("pkg.name")
    }));
    $(ul).append(_.template(template, {
      name: "release",
      value: version
    }));
    $(ul).append(_.template(template, {
      name: "date",
      value: grunt.template.today("yyyy-mm-dd")
    }));
    $(ul).append(_.template(template, {
      name: "commit",
      value: sha
    }));

  };
  var matchFiles = function(re) {

    var scripts = [];
    var $ = cheerio.load(fs.readFileSync('./client/default/index.html'));
    $('script').each(function(index, el) {
      var src = $(el).attr('src');
      if (src != null && src.match(re)) {
        scripts.push('./client/default/' + src);
      }
    });
    if (grunt.option("verbose")) {
      grunt.log.writeln('scripts matching ' + re + ' in index.html:' + JSON.stringify(scripts));
    }
    return scripts;
  };
  var adviseModels = function(name, models, done) {
    var $ = cheerio.load(fs.readFileSync(name + '/client/default/index.html'));
    $.root().append("\n<script>\n  $fh.ready({},\nfunction (){\n      Advice.adviseBackbone(" + models + ");\n  });\n</script>\n");
    var html = $.root().html();
    fs.writeFileSync(name + '/client/default/index.html', html);

    child.exec('cd ' + name + ' && zip -r ../' + name + '.zip .', function(error, stdout, stderr) {
      if (grunt.option("verbose")) {
        grunt.log.writeln("advise models error : " + error);
      }
      done(error);
    });
  };
  var updateBanner = function(options, done) {
    var name = options.name;
    var $ = options.$;

    if (!$) {
      $ = cheerio.load(fs.readFileSync(name + '/client/default/index.html'));
    }
    require('child_process').exec(' git rev-parse --short  --verify HEAD', function(error, stdout, stderr) {
      if (grunt.option("verbose")) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
      }
      var sha = stdout.trim();

      generateBanner($, grunt, sha, false);
      var htmlDev = $.root().html();

      // write index files
      fs.writeFileSync(name + '/client/default/index.html', htmlDev);
      grunt.log.writeln('index copied and modified');
      done();

    });
  };

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
    concat: {
      dist: {
        src: ['<banner>'].concat(matchFiles(/^(?!lib\/)|(mobiscroll)/)),
        dest: 'dist-dev/client/default/main.js'
      },
      lib: {
        src: ['<banner>'].concat(matchFiles(/^lib\//)),
        dest: './dist-dev/client/default/lib.js'
      }
    },
    copy: {
      dist: {
        files: [{
          dest: 'dist/client/default/main.js',
          src : 'dist-dev/client/default/main.js'
        }]
      }
    },
    uglify: {
      lib: {
        src: ['./dist-dev/client/default/lib.js'],
        dest: './dist/client/default/lib.min.js',
        mangle: false
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
      files: ['./client/default/js/**/*.js']
    },
    wget: {
      backboneJSSDK: {
        files: {
          './client/default/lib/appFormjs-backbone.js':'https://raw.githubusercontent.com/feedhenry/fh-js-sdk/feedhenry3-dist/appForms-backbone.js'
        },
        options: {
          overwrite: true
        }
      }
    }
  });

  grunt.registerTask('clean', 'Clean up files/folders', function() {
    var wrench = require('wrench');
    var fs = require('fs');

    wrench.rmdirSyncRecursive('./dist', true);
    wrench.rmdirSyncRecursive('./dist-dev', true);
    try {
      fs.unlinkSync('./dist.zip');
    } catch (e) {
      console.error("did not delete dist.zip");
    }
    try {
      fs.unlinkSync('./max.zip');
    } catch (e) {
      console.error("did not delete max.zip");
    }
  });

  grunt.registerTask('index', 'Copy and modify index.html file for use with dist stuff', function() {
    var done = this.async();
    var cheerio = require('cheerio');
    var fs = require('fs');

    var $ = cheerio.load(fs.readFileSync('./client/default/index.html'));

    // remove script tags with a src
    $('script').each(function(index, el) {
      var src = $(el).attr('src');
      if (src != null) {
        $(el).remove();
      }
    });


    // add the tags and make a dev copy of the html
    $.root().append('<script src="lib.js"></script>\n');
    $.root().append('<script src="main.js"></script>\n');
    require('child_process').exec(' git rev-parse --short  --verify HEAD', function(error, stdout, stderr) {
      if (grunt.option("verbose")) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
      }
      var sha = stdout.trim();

      generateBanner($, grunt, sha, true);
      var htmlDev = $.root().html();

      // insert the minified files for prod
      $('script[src="lib.js"]').attr('src', 'lib.min.js');
      var htmlProd = $.html();

      // write index files
      fs.writeFileSync('./dist-dev/client/default/index.html', htmlDev);
      fs.writeFileSync('./dist/client/default/index.html', htmlProd);
      grunt.log.writeln('index copied and modified');
      done();

    });

  });

  grunt.registerTask('mkdirs', 'Make dirs used for dist stuff', function() {
    var wrench = require('wrench');

    // create dist dirs
    ['./dist-dev/', './dist/'].forEach(function(dir) {
      wrench.mkdirSyncRecursive(dir + 'client/default', '0777');
    });
    grunt.log.writeln('dist dirs created');
  });

  grunt.registerTask('archive', 'Create archive of repo and unzip to temp folder', function() {
    var done = this.async();
    require('child_process').exec('git archive --worktree-attributes -o dist.zip -v HEAD;cd dist;unzip ../dist.zip;cd ..', function(error, stdout, stderr) {
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

  grunt.registerTask('max-archive', 'Create unminfied archive of repo to import', function() {
    var done = this.async();

    var wufoo_config = grunt.option("wc");

    fs.renameSync(".gitattributes", ".gitattributes.bak");
    fs.writeFileSync(".gitattributes", ["grunt.js export-ignore",
      "/package.json export-ignore",
      "README.md export-ignore",
      ".gitignore export-ignore",
      "client/wufoo_config.js export-subst",
      ".gitattributes export-ignore"
    ].join("\n"));

    var tasks = [];

    tasks.push(function(done) {
      updateBanner({
        name: 'max'
      }, done);
    });

    if (grunt.option("am")) {
      tasks.push(function(done) {
        adviseModels('max', grunt.option("am"), done);
      });
    }
    if (wufoo_config) {
      tasks.push(function(done) {
        child.exec('zip max.zip cloud/wufoo_config.js', function(error, stdout, stderr) {
          grunt.log.writeln("wufoo_config error : " + error);
          done(error);
        });
      });
    }

    require("async").series(tasks, function(err) {
      require('wrench').rmdirSyncRecursive('./max', true);
      fs.renameSync(".gitattributes.bak", ".gitattributes");
      done(err);
    });
  });

  grunt.registerTask('rearchive', 'Rearchive dist folder contents into zip file', function() {
    var done = this.async();

    require('wrench').rmdirSyncRecursive('./dist-dev', true);
    var tasks = [];
    tasks.push(function(done) {
      require('child_process').exec('cd dist;zip -r ../dist.zip .;cd ..', function(error, stdout, stderr) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
        if (error !== null) {
          grunt.log.writeln('exec error: ' + error);
        }
        done(error);
      });
    });

    if (grunt.option("am")) {
      tasks.push(function(done) {
        adviseModels('dist', grunt.option("am"), done);
      });
    }
    require("async").series(tasks, function(err) {
      done(err);
    });

  });


  grunt.registerTask('get-commit-sha', 'get the current git commit sha', function() {
    var done = this.async();

    require('child_process').exec(' git rev-parse --verify HEAD', function(error, stdout, stderr) {
      grunt.log.writeln('stdout: ' + stdout);
      grunt.log.writeln('stderr: ' + stderr);
      sha = stdout;
      grunt.log.writeln('sha: ' + sha + "'");
      if (error !== null) {
        grunt.log.writeln('exec error: ' + error);
        done(1);
      } else {
        done();
      }
    });
  });

  // Default task.
  grunt.registerTask('default', ['clean','wget', 'jshint','mkdirs','archive', 'concat', 'copy', 'uglify:lib', 'index']);

};