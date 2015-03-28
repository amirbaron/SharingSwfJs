var app = angular.module('quizAppCopy', ['ui.router','parse-angular','parse-angular.enhance','ui.bootstrap']);
//app.config(['ngClipProvider', function(ngClipProvider) {
//    ngClipProvider.setPath("components/zeroclipboard/dist/ZeroClipboard.swf");
//}]);

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/itemList");
    //
    // Now set up the states
    $stateProvider
        .state('itemList', {
            url: "/itemList",
            templateUrl: "partials/itemList.html",
            controller: "itemListCtrl"
        });
});

(function() {
    Parse.initialize("BZ5XSiStXyIe6ukM9iuZwPg3rOeRz8l2yQDweSNv", "hWsKxXUSU6OxCnEL6jDEM1VAxwk1EWlClEWhwGqH");
})();
