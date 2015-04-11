var app = angular.module('quizAppCopy', ['ui.router', 'parse-angular', 'parse-angular.enhance', 'ui.bootstrap']);
app.service('appPagesService', function($q) {
    return {
        getAppPages: function() {
            var dfd = $q.defer()

            setTimeout(function() {
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
                        result;
                        dfd.resolve(result

                        )

                    })



            }, 2000)

            return dfd.promise
        }
    }
})




//app.config(['ngClipProvider', function(ngClipProvider) {
//    ngClipProvider.setPath("components/zeroclipboard/dist/ZeroClipboard.swf");
//}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/itemList");
    //
    // Now set up the states
    $stateProvider
        .state('itemList', {
            url: "/itemList",
            templateUrl: "partials/itemList.html",
            resolve: {

                appPages: function (appPagesService) {
                    return appPagesService.getAppPages();
                }
            },
            controller: "itemListCtrl"

        }).state('itemList.item', {
            url: "/itemList:itemId",
            onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                $modal.open({
                    templateUrl: "partials/itemViewer.html",
                    resolve: {
                        //appPages: 'appPages'
                    },
                    controller: "itemViewerCtrl"
                }).result.finally(function () {
                        $state.go('^');
                    });
            }]

        });
});

(function () {
    Parse.initialize("BZ5XSiStXyIe6ukM9iuZwPg3rOeRz8l2yQDweSNv", "hWsKxXUSU6OxCnEL6jDEM1VAxwk1EWlClEWhwGqH");
})();

