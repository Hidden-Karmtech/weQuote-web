module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // Define the configuration for all the tasks
  grunt.initConfig({
    wiredep: {
      app: {
        src: ['app/index.html'],
        ignorePath:  /\.\.\//
      }      
    },
    connect: {
      server: {
        options: {
          port: 9000,
          keepalive: true,
          base:'app'
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

    
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
   
    grunt.task.run([
      'connect'
    ]);
  });

  grunt.registerTask('deploy', [
    'ftp-deploy'
  ]);
};