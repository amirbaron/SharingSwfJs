app.controller("createCtrl", function ($scope, $location,newItem,loginService,$state) {
    $scope.create=function(){
        $state.go('base.itemList.item.edit.slides', {itemId:newItem.id});
    }

});
