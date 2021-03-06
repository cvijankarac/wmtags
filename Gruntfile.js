module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: 'css/styles.css.map',
          sourceMapURL: '/css/styles.css.map'
        },
        files: {
          "css/styles.css": "css/less/base.less" // destination file and source file
        }
      }
    },
    cssmin: {
      css: {
        src: 'css/styles.css',
        dest: 'css/styles.min.css'
      }
    },
    watch: {
      styles: {
        files: ['css/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};