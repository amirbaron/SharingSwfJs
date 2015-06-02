app.controller("loginCtrl", function ($scope, $location, loginService,itemsService,$state) {

    $scope.profileImg = loginService.getUserImg();

    $scope.userLoggedIn = function () {
        return loginService.isLoggedIn();
    }

    $scope.login = function () {
        loginService.login().then(function () {
                $scope.profileImg = loginService.getUserImg()
            }, function () {

            }
        );
    }

    $scope.logout = function () {
        loginService.logout();
    }

    $scope.searchTerm='';
    $scope.searching=false;
    $scope.getItemsWithTerm = function(searchTerm) {
        return itemsService.getItemsWithTerm(searchTerm);
    };
    $scope.selectItem=function($item, $model, $label){
        $state.go('base.itemList.item.view.slides',{itemId:""+$item.id+""})
    }

});
