module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    concat: {
      development: {
        src: ['src/build/file_begin.js', 'src/build/development_environment.js', 'src/*.js', 'src/build/file_end.js'],
        dest: 'dist/development/<%= pkg.name %>.js'
      },
      homolog: {
        src: ['src/build/file_begin.js', 'src/build/homolog_environment.js', 'src/*.js', 'src/build/file_end.js'],
        dest: 'dist/homolog/<%= pkg.name %>.js'
      },
      sandbox: {
        src: ['src/build/file_begin.js', 'src/build/sandbox_environment.js', 'src/*.js', 'src/build/file_end.js'],
        dest: 'dist/sandbox/<%= pkg.name %>.js'
      },
      production: {
        src: ['src/build/file_begin.js', 'src/build/production_environment.js', 'src/*.js', 'src/build/file_end.js'],
        dest: 'dist/production/<%= pkg.name %>.js'
      },
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %>.js - version: <%= pkg.version %> - <%= grunt.template.today("dd/mm/yyyy") %> */\n'
      }
    },
    jasmine: {
      src: ['src/build/development_environment.js', 'src/*.js'],
      options: {
        specs: 'spec/*.js',
        helpers: 'spec/helpers/*.js',
        vendor: ['lib/jquery-2.1.0.min.js', 'lib/jasmine-jquery.js', 'lib/jsencrypt.min.js'],
        keepRunner: true
      }
    },
    uglify: {
      development: {
        src: 'dist/development/<%= pkg.name %>.js',
        dest: 'dist/development/<%= pkg.name %>.min.js'
      },
      homolog: {
        src: 'dist/homolog/<%= pkg.name %>.js',
        dest: 'dist/homolog/<%= pkg.name %>.min.js'
      },
      sandbox: {
        src: 'dist/sandbox/<%= pkg.name %>.js',
        dest: 'dist/sandbox/<%= pkg.name %>.min.js'
      },
      production: {
        src: 'dist/production/<%= pkg.name %>.js',
        dest: 'dist/production/<%= pkg.name %>.min.js'
      },
      options: {
        wrap: true,
        preserveComments: 'some'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jasmine', 'concat']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', ['default', 'uglify']);
};
