
module.exports = function(grunt) {
 grunt.initConfig({
   connect: {
     server: {
       options: {
         base: '.',
         keepalive: true,
         port: 10000
       }
     }
   }
 });

 grunt.loadNpmTasks('grunt-contrib-connect');

 grunt.registerTask('default', ['connect']);
};