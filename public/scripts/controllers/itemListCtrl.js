app.controller("itemListCtrl", function ($scope, $location, $modal) {
    // Queries
    console.log("in itemListCtrl");
    Parse.Object.extend({
        className: "AppPage",
        attrs: ['page', 'name', 'title', 'type'],
        getPageObject: function () {
            return angular.fromJson(this.getPage());
        }
    });
    var query = new Parse.Query("AppPage");
    query.find()
        .then(function (result) {
            $scope.appPages = result;
        });
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