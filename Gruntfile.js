module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: "src/*.js",
      options: {
        specs: "spec/*.js",
        helpers: "spec/helpers/*.js",
        vendor: ["lib/jsencrypt.min.js"],
      }
    },

    concat: {
      dist: {
        src: ["lib/jsencrypt.min.js", "src/*.js"],
        dest: "dist/<%= pkg.name %>-<%= pkg.version %>.js",
      },
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %>.js - version: <%= pkg.version %> - <%= grunt.template.today("dd/mm/yyyy") %> */\n'
      }
    },

    uglify: {
      dist: {
        src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    }

  });

  // Register tasks
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task
  grunt.registerTask("default", "jasmine");
  grunt.registerTask("build", ["default", "concat", "uglify"]);


  //grunt.loadNpmTasks('grunt-karma');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');

  //grunt.registerTask('default', ['jasmine', 'concat']);
  //grunt.registerTask('test', ['karma']);
  //grunt.registerTask('build', ['default', 'uglify']);
};
