module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.initConfig({
    wiredep: {
      app: {
        src: ['app/index.html'],
        ignorePath: /\.\.\//
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          keepalive: true,
          base: 'app'
        }
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.wequote.it',
          port: 21,
          authKey: 'hkt'
        },
        src: 'app/',
        dest: '/public_html',
        exclusions: ['.htaccess']
      }
    }
  });

  grunt.registerTask('serve', function(target) {
    grunt.task.run([
      'wiredep',
      'connect'
    ]);
  });

  grunt.registerTask('deploy', [
    'wiredep',
    'ftp-deploy'
  ]);
};