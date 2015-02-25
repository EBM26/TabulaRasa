angular
  .module("tabulaApp")
  .controller("listsController", listsController);

   function listsController($scope, $http, $resource, $state, List, Item) {
    List.query(function(data){
        $scope.lists = data;
        
    });

  }

  angular
    .module("tabulaApp")
    .controller("newListController", newListController);

    function newListController($scope, $http, $state, $resource, $stateParams, List){

      $scope.createList = function() {
        new List (
          $scope.list
        ).$save(function(data) {
          $state.go("");
        });
      }
    }

    angular
      .module("tabulaApp")
      .controller("newItemController", newItemController);

      function newItemController($scope, $http, $state, $resource, $stateParams, Item){
        $scope.createItem = function() {
          new Item (
            $scope.item
            ).$save(function(data){
              $state.go("");
            });
        }
      }



 angular
    .module("tabulaApp")
    .factory("List", ListsFactory);


  function ListsFactory($resource) {
    return $resource('api/lists/:id', {id: '@id'},
        {
          'update': { method: 'PUT'}
        }
      );
  }

angular
  .module('tabulaApp')
  .factory("Item", ItemsFactory); 

  function ItemsFactory($resource) {
    return $resource('api/lists/:list_id/items/:id', { list_id: '@list_id', id: '@id' },
    {
      'update': { method: 'PUT'}
    }
    );
  }