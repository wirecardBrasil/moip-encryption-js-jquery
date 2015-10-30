module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '<%= pkg.name %>-<%= pkg.version %>.js',
    
    jshint : {
      all: ['src/**/*.js']
    },
            
    jasmine: {
      src: "src/**/*.js",
      options: {
        specs: "spec/**/*.js",
        helpers: "spec/helpers/*.js",
        vendor: ["lib/jsencrypt.min.js"],
      }
    },

    concat: {
      dist: {
        src: ["lib/jsencrypt.min.js", "src/*.js"],
        dest: 'build/<%= pkg.name %>.js',
      },
      options: {
        stripBanners: true,
        stripFooters: true,
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= banner %> - build date: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    
    copy: {
      version: {
        src: 'build/<%= pkg.name %>.min.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js',
      },
    },
    
    bump: {
        options: {
          files: ['package.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          regExp: false
        }
    },

    s3: {
      options: {
        // provide AWS keys as environment variables
        // export AWS_ACCESS_KEY='xyz'
        // export AWS_SECRET_KEY='abc'
        accessKeyId:     process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        bucket: 'assets.moip.com.br',
        headers: {
          CacheControl: 'public, max-age=180'
        }
      },
      specificFiles: {
        files: [{
          src: 'build/<%= pkg.name %>.min.js',
          dest: 'integration/<%= pkg.name %>.min.js'
        },
        {
          src: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js',
          dest: 'integration/<%= pkg.name %>-<%= pkg.version %>.min.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-aws');

  //**********************
  // Private task (auxiliar)
  //**********************
  grunt.registerTask('refresh', 'Refresh data from package.json', function() {
    grunt.config.set('pkg', grunt.file.readJSON('./package.json'));
  });

  //**********************
  // Public tasks
  //**********************
  grunt.registerTask('default', ['jshint','jasmine'] );
  grunt.registerTask('build', ['default', 'concat', 'uglify', 'copy:version']);
  
  //**********************
  // Final task (publish lib)
  //**********************
  grunt.registerTask('release', 'Release moip.js: Bump version and upload moipjs to public host', function(verTarget) {
    if (verTarget == null){
      grunt.fail.fatal('Specify SemVer release level: release:patch, release:minor, release:major');
    }
    if (!(verTarget == 'patch' || verTarget == 'minor' || verTarget == 'major')) {
      grunt.fail.fatal('Specify SemVer release level: release:patch, release:minor, release:major');
    }
    grunt.task.run(['build', 'bump-only:'+verTarget, 'refresh', 'build', 's3', 'bump-commit']);
  });

};
