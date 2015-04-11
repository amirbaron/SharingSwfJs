var app = angular.module('quizAppCopy', ['ui.router', 'parse-angular', 'parse-angular.enhance', 'ui.bootstrap']);
app.service('itemsService', function ($q) {
    Parse.Object.extend({
        className: "AppPage",
        attrs: ['page', 'name', 'title', 'type'],
        getPageObject: function () {
            return angular.fromJson(this.getPage());
        }
    });


    return {
        getItems: function () {

            var dfd = $q.defer()

            var query = new Parse.Query("AppPage");
            query.find().then(function (result) {
                dfd.resolve(result
                )

            });


            return dfd.promise
        },

        getItem: function (itemId) {
            var dfd = $q.defer()
            var query = new Parse.Query("AppPage");
            query.get(itemId).then(function (result) {
                dfd.resolve(result
                )
            });
            return dfd.promise

        }
    }
})


//app.config(['ngClipProvider', function(ngClipProvider) {
//    ngClipProvider.setPath("components/zeroclipboard/dist/ZeroClipboard.swf");
//}]);

app.run(function ($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
});

app.config(function ($stateProvider, $urlRouterProvider) {
    //

    // For any unmatched url, redirect to /state1
    //fg0ckQ7Zq6
    $urlRouterProvider.otherwise("/itemList");
    //
    // Now set up the states
    $stateProvider
        .state('itemList', {
            url: "/itemList",
            templateUrl: "partials/itemList.html",
            resolve: {

                items: function (itemsService) {
                    return itemsService.getItems();
                }
            },
            controller: "itemListCtrl"

        }).state('itemList.item', {
            url: "/:itemId",
            onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                $modal.open({
                    templateUrl: "partials/itemViewer.html",
                    resolve: {
                        item: function(itemsService){
                            return itemsService.getItem($stateParams.itemId);
                        }
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

