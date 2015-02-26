angular 
    .module("tabulaApp", ['ngResource',  'ui.router', 'templates']); // naming the ng-app, the controller, using the ui-router and templates
    

angular
  .module("tabulaApp")
  .config(["$httpProvider", "$stateProvider", "$urlRouterProvider", function($httpProvider, $stateProvider, $urlRouterProvider) { // creating the X-CSRF-Token for security
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = 
      $('meta[name=csrf-token]').attr('content');


      $stateProvider

       .state("userhome",{
        url:"", 
        templateUrl: "userhome.html"
       })


       ;
     }]);