app.controller("itemListCtrl", function ($scope, $location, $modal, items,loginService) {
    // Queries

    //$scope.appPages = appPages;
    $scope.items = items;
    $scope.viewItem = function (item) {
        var itemViewerCtrl = $modal.open({
            templateUrl: 'partials/itemViewer.html',
            controller: 'itemViewerCtrl',
            resolve: {
                item: function () {
                    return item;
                }
            }
        });
    }

    $scope.userLoggedIn = function () {
        return loginService.isLoggedIn();
    }

    $scope.login = function () {
        loginService.login();
    }

    $scope.logout = function () {
       loginService.logout();
    }


});