module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    jasmine: {
      src: "src/**/*.js",
      options: {
        specs: 'spec/**/*.js',
        vendor: ['lib/jquery-2.1.0.min.js', 'lib/jasmine-jquery.js', 'lib/jsencrypt.min.js'],
        keepRunner: true
      }
    },
    uglify: {
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', ['jasmine', 'uglify']);
};
