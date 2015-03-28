app.controller("itemViewerCtrl", function ($scope, $location,$modalInstance,item) {
    // Queries
    console.log("in itemViewerCtrl selected item is " + item.id);
    $scope.item=item;
});

