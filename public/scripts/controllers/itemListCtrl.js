app.controller("itemListCtrl", function ($scope, $location, $modal, items) {
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
        if (Parse.User.current()) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.login = function () {
        var currentUser = Parse.User.current();
        if (currentUser) {
            return;
        }
        // Run code after the Facebook SDK is loaded.
        Parse.FacebookUtils.logIn(null, {
            success: function (user) {
            },
            error: function (user, error) {
            }
        });
    }

    $scope.logout = function () {
        var currentUser = Parse.User.current();
        if (currentUser) {
            Parse.User.logOut();
        }
        return;
    }


});