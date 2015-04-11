app.controller("flatItemViewerCtrl", function ($scope, $location,itemId) {
    // Queries
    console.log("in flatItemViewerCtrl location is " + $location.hash());
    console.log("in flatItemViewerCtrl selected item is " + itemId);
    //$scope.item=item;
    //$scope.selectedSlide = 0;
    //Parse.Object.extend({
    //    className: "AppPage",
    //    attrs: ['page', 'name', 'title', 'type'],
    //    getPageObject: function () {
    //        return angular.fromJson(this.getPage());
    //    }
    //});
    //
    //$scope.entityClicked = function() {
    //    $scope.selectedSlide++;
    //}
});
