angular
    .module("tabulaApp")
    .factory("List", ["$resource", function ($resource) {
    return $resource('api/lists/:id', {id: '@id'},
        {
          'update': { method: 'PUT'}
        }
      );
  }]);


angular
  .module("tabulaApp")
  .controller("listsController", ["$scope", "$http", "$resource", "$state", "List", function ($scope, $http, $resource, $state, List, Item) {
    List.query(function(data){
        $scope.lists = data;

    });

  }]);

  angular
    .module("tabulaApp")
    .controller("newListController", ["$scope", "$http", "$state", "$resource", "$stateParams", "List", function ($scope, $http, $state, $resource, $stateParams, List){

      $scope.createList = function() {
        new List (
          $scope.list
        ).$save(function(data) {
          $state.go("");
        });
      }
    }]);


 