module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    sasslint: {
      options: {
        configFile: 'config/.sass-lint.yml',
      },
      target: ['assets/*.scss']
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'dev/assets', src: '**', dest: 'dist/assets',},
        ],
      },
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'dev/scss',
          src: [
            '*.scss'
          ],
          dest: 'dist/assets/css',
          ext: '.min.css'
        }]
      },
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'dev/scss',
          src: [
            '*.scss'
          ],
          dest: 'dev/assets/css',
          ext: '.css'
        }]
      }
    },

    browserSync: {
      bsFiles: {
        src : [
          'dist/assets/css/*.css',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: true,
        port: 8080
      }
    },

    watch: {
      files: ['dev/scss/**/*.scss'],
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', [
    'copy:main',
    'sass:dev',
    'sass:dist',
    'browserSync',
    'watch'
  ]);

};
