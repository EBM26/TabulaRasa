angular
.module("tabulaApp")
    .factory("List", ["$resource", function ($resource) { // factory that makes the list code
    return $resource('api/lists/:id', {id: '@id'}, // using the $resource to get the list api from rails
    {
      'update': { method: 'PUT'}
    }
    );
  }]);


angular // controller that shows the list index. The array of arguments with quotations is so the angular code will not break when midified
.module("tabulaApp")
.controller("listsController", ["$rootScope", "$scope", "$http", "$resource", "$state", "List", "$modal",
  function ($rootScope, $scope, $http, $resource, $state, List, $modal) {



    List.query(function(data){
        $rootScope.lists = data; // $rootScope allows the the lists array method to be accessed in the second controller in order to have the created list show right away
      });

    $scope.deleteList = function(list) { // deletes list and all the items inside of it
      if (confirm("Are you sure you want to delete this list?")) {
        list.$delete(function(){
          List.query(function(data){
            $rootScope.lists = data;
          });
        });
      }
    }

    $scope.openAddList = function() { // modal code that adds new list
      $modal.open({
        templateUrl: 'lists/new.html',
        controller: "newListController",
        windowClass: 'addModal'
      });
    };


      $scope.openShowItem = function(list) { // modal code that shows the items inside each list
        $modal.open({
          templateUrl: 'items/show.html', // the modal template
          controller: 'itemsController', // the controller the modal is using
          windowClass: 'addModal',
          resolve: {                    // allows data to be passed to the model from a different controller than the one it is was opened from
            list: function(){
              return list;
            }
          }
        });
      };
      
      
    }]);

  angular // controller that creates a new list
  .module("tabulaApp")
  .controller("newListController", ["$rootScope", "$scope", "$http", "$state", "$resource", "$stateParams", "List", "$modalInstance",
    function ($rootScope, $scope, $http, $state, $resource, $stateParams, List, $modalInstance){

      $scope.createList = function() {


        new List (
          $scope.list
          ).$save(function(data) {
            $modalInstance.dismiss('created');
            $rootScope.lists.push(data);
        }, function(error){ // beginning of function that renders an error message if list name already exists 
          $scope.errorMessage = "list already exists"; // error message if user tries to duplicate list name
        });
        }
      }]);


  