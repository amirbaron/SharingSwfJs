app.controller("itemListCtrl", function ($scope, $location, $modal, items) {
    $scope.items = items;

    $scope.create = function () {
        console.log("In create ")
    }


});