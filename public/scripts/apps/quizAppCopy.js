var app = angular.module('quizAppCopy', ['ui.router', 'parse-angular', 'parse-angular.enhance', 'ui.bootstrap', 'ng-uploadcare']);
app.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('$viewContentLoaded - fired after dom rendered', event);
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
}]);

app.service('itemsService', function ($q) {
    Parse.Object.extend({
        className: "AppPage",
        attrs: ['page', 'name', 'title', 'type', 'user'],
        getPageObject: function () {
            return angular.fromJson(this.getPage());
        },
        setPageObject: function (pageObject) {
            this.setPage(angular.toJson(pageObject));
        }


    });


    return {
        getItems: function () {
            var dfd = $q.defer();
            var query = new Parse.Query("AppPage");
            query.find().then(function (result) {
                dfd.resolve(result);
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


app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/itemList");
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
            url: "",
            abstract: true,
            backdrop: false,
            onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                console.log('Open modal');
                $modal.open({
                    template: '<div ui-view="modal"></div>'

                }).result.finally(function () {
                        $state.go('itemList');
                    });
            }]

        }).state('itemList.item.view', {
            abstract: false,
            parent:'itemList.item',
            url: "/:itemId",
            views: {
                'modal@': {
                    templateUrl: 'partials/itemViewer.html',
                    resolve: {
                        item: function (itemsService, $stateParams) {
                            console.log("Item id is " + $stateParams.itemId);
                            return itemsService.getItem($stateParams.itemId);
                        }
                    },
                    controller: "itemViewerCtrl"
                }
            }

        })
})
;
