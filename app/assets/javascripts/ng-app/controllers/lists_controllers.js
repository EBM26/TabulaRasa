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
      list.$delete(function(){
        List.query(function(data){
          $rootScope.lists = data;
        });
      });
    }

    $scope.openAddList = function() { // modal code that adds new list
      $modal.open({
        templateUrl: 'lists/new.html',
        controller: "newListController",
        windowClass: 'addListModal'
      });
    };

    $scope.openAddItem = function(id) { // modal code that opens and creates new items
      $modal.open({
        templateUrl: 'items/new.html', // the modal template
        controller: 'newItemController', // the controller the modal is using
      resolve: {
        list_id: function () {
          return id;
        }
      }
    });
  };

      $scope.openShowItem = function(list) { // modal code that shows the items inside each list
        $modal.open({
          templateUrl: 'items/show.html', // the modal template
          controller: 'itemsController', // the controller the modal is using
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
        });
      }
    }]);


 