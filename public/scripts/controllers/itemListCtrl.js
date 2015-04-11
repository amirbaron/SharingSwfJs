app.controller("itemListCtrl", function ($scope, $location, $modal,appPages) {
    // Queries

    //$scope.appPages = appPages;
    console.log("in itemListCtrl " + appPages);
    $scope.appPages = appPages;
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

});