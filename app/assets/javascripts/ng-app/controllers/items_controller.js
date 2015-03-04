angular 
  .module("tabulaApp") // app name
  .factory("Item", ["$resource", function ($resource) {  // factory to hold item code
    return $resource('/api/lists/:list_id/items/:id', {list_id: '@list_id', id: '@id' }, // the resource that angular gets the rails api from 
        {
          'update': { method: 'PUT'} // customized angular edit method
        }
      );
  }]);

angular // controller that shows item index with the list id special to it
  .module("tabulaApp")
  .controller("itemsController", ["$scope", "$http", "$resource", "$state", "Item","$modalInstance", "list", function ($scope, $http, $resource, $state, Item, $modalInstance, list) {
   
    $scope.list = list;
    Item.query({ list_id: list.id },function(data){
        $scope.items = data;

    });

    // deletes the specific item
    $scope.deleteItem = function(item) { 
      item.$delete({ list_id: list.id, id: item.id }, function(){
        Item.query({ list_id: list.id}, function(data){
          $scope.items = data;
        });
      });
    }

  }]);

  angular
    .module("tabulaApp") // controller that creates a new item according to the list id
    .controller("newItemController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Item","$modalInstance", "list_id", "$rootScope", function ($scope, $http, $state, $resource, $stateParams, Item, $modalInstance, list_id, $rootScope){

      $scope.createItem = function() {
        $scope.item.list_id = list_id; // connects item to list id

        // $scope.noGo = function(){
        //    $scope.item.name;
        //   var list = $rootScope.lists 
        // }

        new Item (
          $scope.item
        ).$save({ list_id: list_id}, function(data) { // saves to the appropriate list id
          $modalInstance.dismiss('created'); // closes the modal after the item is created
        }, function(error){
          $scope.errorMessage = "item already exists"; // error message if user tries to duplicate name in list
        });
      }
    }]);


 