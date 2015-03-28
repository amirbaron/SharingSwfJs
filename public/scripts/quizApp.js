var app = angular.module("quizApp", ['angularLoad','ngClipboard','ngRoute','parse-angular','parse-angular.enhance']);
app.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/uploader.html',
            controller: 'uploaderCtrl'
        }).
        when('/:itemId', {
            templateUrl: 'item.html',
            controller: 'itemCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
});

app.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("components/zeroclipboard/dist/ZeroClipboard.swf");
}]);

(function() {
    Parse.initialize("BZ5XSiStXyIe6ukM9iuZwPg3rOeRz8l2yQDweSNv", "hWsKxXUSU6OxCnEL6jDEM1VAxwk1EWlClEWhwGqH");
})();