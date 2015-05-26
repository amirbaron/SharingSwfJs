app.controller("createCtrl", function ($scope, $location, itemsService, loginService, $state) {
    $scope.create = function () {
        itemsService.createNewItem().then(function (item) {

            $state.go('base.itemList.item.edit.slides', {itemId: item.id});

        }, function (error) {

        });
    }

});
