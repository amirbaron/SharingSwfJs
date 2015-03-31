app.controller("itemViewerCtrl", function ($scope, $location,$modalInstance,item) {
    // Queries
    console.log("in itemViewerCtrl selected item is " + item.id);
    $scope.item=item;
    $scope.selectedSlide = 0;
    Parse.Object.extend({
        className: "AppPage",
        attrs: ['page', 'name', 'title', 'type'],
        getPageObject: function () {
            return angular.fromJson(this.getPage());
        }
    });

    $scope.entityClicked = function() {
        $scope.selectedSlide++;
    }
});

