app.controller("itemsProviderCtrl", function ($scope, $location, $modal, items, itemsService) {
    console.log("fdffkjfkldsjlfjdslfjlkasjdflkdfjldjl")
    $scope.items = items;
    $scope.search = function (term) {
        itemsService.getItemsWithTerm(term).then(function (results) {
            $scope.items = results;
        }, function () {
        });
    }

});