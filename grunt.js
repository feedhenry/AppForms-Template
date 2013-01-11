/*global module:false*/
var cheerio = require('cheerio');
var fs = require('fs');
var child = require('child_process');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.task.registerHelper('matchFiles', function(re) {

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
    if(grunt.option("verbose")) {
      grunt.log.writeln('scripts matching ' + re + ' in index.html:' + JSON.stringify(scripts));
    }
    return scripts;
  });

  grunt.task.registerHelper('adviseModels', function(name,models,done) {
    var $ = cheerio.load(fs.readFileSync(name + '/client/default/index.html'));
    $.root().append("\n<script>\n  $fh.ready(\n    function (){\n      Advice.adviseBackbone(" + models+ ");\n  });\n</script>\n");
    var html = $.root().html();
    fs.writeFileSync(name + '/client/default/index.html', html);

    child.exec('cd '+ name + ' && zip -r ../'+ name + '.zip .', function (error, stdout, stderr) {
      if(grunt.option("verbose")) {
        grunt.log.writeln("advise models error : " + error);
      }
      done(error);
    });
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
        // TODO : minifying mobiscroll seems to cause a problem so I'm adding it to main.js for the moment
        src: ['<banner>'].concat(grunt.helper('matchFiles', /^(?!lib\/)|(mobiscroll)/)),
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
    try {
      fs.unlinkSync('./max.zip');
    } catch (e) {
      // fail silently
    }
  });

  grunt.registerTask('index', 'Copy and modify index.html file for use with dist stuff', function () {
    var done = this.async();
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
    require('child_process').exec(' git rev-parse --short  --verify HEAD', function (error, stdout, stderr) {
      if(grunt.option("verbose")) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
      }
      var sha = stdout.trim();

      $('#fh_banner')
        .append($('<p class="sha">').text('ID : ' + sha))
        .append($('<p class="name">').text('name : ' + grunt.config("pkg.name")))
        .append($('<p class="version">').text('version : ' + grunt.config("pkg.version")))
        .append($('<p class="date">').text('date : ' + grunt.template.today("yyyy-mm-dd")));

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

  grunt.registerTask('max-archive', 'Create unminfied archive of repo to import', function () {
    var done = this.async();

    var wufoo_config = grunt.option("wc");

    fs.renameSync(".gitattributes", ".gitattributes.bak");
    fs.writeFileSync(".gitattributes",
      ["grunt.js export-ignore" ,
        "/package.json export-ignore" ,
        "README.md export-ignore" ,
        ".gitignore export-ignore" ,
        "client/wufoo_config.js export-subst" ,
        ".gitattributes export-ignore"].join("\n")
    );

    var tasks = [];
    tasks.push(function(done){
      child.exec('git archive --worktree-attributes -o max.zip -v HEAD && unzip max.zip -d max', function (error, stdout, stderr) {
        if(grunt.option("verbose") && error) {
          grunt.log.writeln('exec error: ' + error);
        }
        done(error);
      });
    });

    if(grunt.option("am")) {
      tasks.push(function(done){
        grunt.helper('adviseModels', 'max',grunt.option("am"),done);
      });
      tasks.push(function(done){
        require('wrench').rmdirSyncRecursive('./max', true);
        done();
      });

    }
    console.log("wufoo_config: " +  wufoo_config);
    if(wufoo_config) {
      tasks.push(function(done){
        child.exec('zip max.zip cloud/wufoo_config.js', function (error, stdout, stderr) {
          grunt.log.writeln("wufoo_config error : " + error);
          done(error);
        });
      });
    }

    require("async").series(tasks,function(err){
      fs.renameSync(".gitattributes.bak", ".gitattributes");
      done(err);
    });
  });

  grunt.registerTask('rearchive', 'Rearchive dist folder contents into zip file', function () {
    var done = this.async();

    require('wrench').rmdirSyncRecursive('./dist-dev', true);
    var tasks = [];
    tasks.push(function(done){
      require('child_process').exec('cd dist;zip -r ../dist.zip .;cd ..', function (error, stdout, stderr) {
        grunt.log.writeln('stdout: ' + stdout);
        grunt.log.writeln('stderr: ' + stderr);
        if (error !== null) {
          grunt.log.writeln('exec error: ' + error);
        }
        done(error);
      });
    });

    if(grunt.option("am")) {
      tasks.push(function(done){
        grunt.helper('adviseModels', 'dist',grunt.option("am"),done);
      });
    }
    require("async").series(tasks,function(err){
      done(err);
    });

  });


  grunt.registerTask('get-commit-sha', 'get the current git commit sha', function () {
    var done = this.async();

    require('child_process').exec(' git rev-parse --verify HEAD', function (error, stdout, stderr) {
      grunt.log.writeln('stdout: ' + stdout);
      grunt.log.writeln('stderr: ' + stderr);
      sha = stdout;
      grunt.log.writeln('sha: ' +  sha + "'");
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
