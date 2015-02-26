angular 
  .module("tabulaApp")
  .factory("Item", ["$resource", function ($resource) {
    return $resource('/api/lists/:list_id/items', {list_id: '@id'},
        {
          'update': { method: 'PUT'}
        }
      );
  }]);

angular
  .module("tabulaApp")
  .controller("itemsController", ["$scope", "$http", "$resource", "$state", "Item", function ($scope, $http, $resource, $state, Item) {
    Item.query(function(data){
        $scope.items = data;

    });

  }]);

  angular
    .module("tabulaApp")
    .controller("newItemController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Item","$modalInstance", "list_id", function ($scope, $http, $state, $resource, $stateParams, Item, $modalInstance, list_id){

      $scope.createItem = function() {
        $scope.item.list_id = list_id;

        new Item (
          $scope.item
        ).$save({ list_id: list_id}, function(data) {
          $modalInstance.dismiss('created');
        });
      }
    }]);


 