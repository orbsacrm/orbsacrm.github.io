var autoprefixer = require('autoprefixer');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var PathConfig = require('./grunt-settings.js');

  // tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: PathConfig,

    //clean files
    clean: {
      options: { force: true },
      temp: {
        src: [
          "<%= config.cssDir %>**/*.map",
          "<%= config.imgDir %>",
          "<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css.map",
          "./jpgtmp.jpg"
        ]
      }
    },

    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            autoprefixer({browsers: ['last 4 version', 'Android 4']})
          ]
        },
        src: ['<%= config.cssDir %>*.css',
              '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
              '!<%= config.cssDir %>bootstrap.css',
              '!<%= config.cssDir %>bootstrap.min.css',
              '!<%= config.cssDir %>ie.css',
              '!<%= config.cssDir %>ie8.css'
             ]
      },
      dist: {
        options: {
          map: false,
          processors: [
            autoprefixer({browsers: ['last 4 version', 'Android 4']})
          ]
        },
        src: [
          '<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '!<%= config.cssDir %>bootstrap.css',
          '!<%= config.cssDir %>bootstrap.min.css',
          '!<%= config.cssDir %>ie.css',
          '!<%= config.cssDir %>ie8.css'
        ]
      }
    },

    //sass
    sass: {
      options: PathConfig.hasBower,
      dev: {
        options: {
          sourceMap: true,
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: [
              '**/*.scss',
              '!<%= config.sassMainFileName %>.scss'
            ],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          }
        ]
      },
      dist: {
        options: {
          sourceMap: false,
          style: 'nested'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: [
              '**/*.scss',
              '!<%= config.sassMainFileName %>.scss'
            ],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          }
        ]
      },
      min: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.min.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.min.css'
          }
        ]
      }
    },

    //watcher project
    watch: {
      options: {
        debounceDelay: 1,
        // livereload: true,
      },
      images: {
        files: ['<%= config.imgSourceDir %>**/*.*'],
        tasks: ['newer:copy:images'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['<%= config.sassDir %>**/*.scss'],
        tasks: ['sass:dev', 'postcss:dev'],
        options: {
          spawn: false,
        }
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= config.imgSourceDir %>',
        src: '**',
        dest: '<%= config.imgDir %>',
        filter: 'isFile',
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= config.imgSourceDir %>',
          src: ['**/*.{jpg,gif,png,svg}'],
          dest: '<%= config.imgDir %>'
        }]
      }
    },

    //Keep multiple browsers & devices in sync when building websites.
    browserSync: {
      dev: {
        bsFiles: {
          src : ['*.html','<%= config.cssDir %>*.css', '*.css']
        },
        options: {
          open: false,
          server: {
            baseDir: "./",
            index: "./index.html",
          },
          watchTask: true
        }
      }
    },

    notify: {
      options: {
        enabled: true,
        max_js_hint_notifications: 5,
        title: "WP project"
      },
      watch: {
        options: {
          title: 'Task Complete',  // optional
          message: 'SASS finished running', //required
        }
      },
    },

    csscomb: {
      all: {
        expand: true,
        src: ['<%= config.cssDir %>*.css',
              '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
              '!<%= config.cssDir %>bootstrap.css',
              '!<%= config.cssDir %>ie.css',
              '!<%= config.cssDir %>ie8.css'
             ],
        ext: '.css'
      },
      dist: {
        expand: true,
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css':
            '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
        },
      }
    },

    cmq: {
      options: {
        log: false
      },
      all: {
        files: [
          {
            expand: true,
            src: ['**/*.css', '!bootstrap.css'],
            cwd: '<%= config.cssDir %>',
            dest: '<%= config.cssDir %>'
          }
        ]
      },
      dist: {
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css':
            '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
        },
      }
    },

    'sftp-deploy': {
      build: {
        auth: {
          host: '<%= config.sftpServer %>',
          port: '<%= config.sftpPort %>',
          authKey: {
            "username": "<%= config.sftpLogin %>",
            "password": "<%= config.sftpPas %>"
          }
        },
        cache: 'sftpCache.json',
        src: 'css',
        dest: '<%= config.sftpDestination %>',
        serverSep: '/',
        concurrency: 4,
        progress: true
      }
    }

  });

  //watch
  grunt.registerTask('w', ['watch']);
  //browser sync
  grunt.registerTask('bs', ['browserSync']);

  //watch + browser sync
  grunt.registerTask('dev', ['browserSync', 'watch']);

  grunt.registerTask('default', ['dev']);

  // upload to server
  grunt.registerTask('sftp', ['sftp-deploy']);

  //css beautiful
  grunt.registerTask('cssbeauty', ['sass:dist', 'cmq:dist', 'postcss:dist', 'csscomb:dist']);

  //img minify
  grunt.registerTask('imgmin', ['imagemin']);

  //final build
  grunt.registerTask('dist', ['clean:temp', 'imgmin', 'cssbeauty']);
};
