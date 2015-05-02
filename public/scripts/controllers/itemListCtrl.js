app.controller("itemListCtrl", function ($scope, $location, $modal, items) {
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
    $scope.create = function () {

    }


});