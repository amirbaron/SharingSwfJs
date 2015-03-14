var app = angular.module("quizApp", ['angularLoad','ngRoute']);
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


(function() {
    Parse.initialize("BZ5XSiStXyIe6ukM9iuZwPg3rOeRz8l2yQDweSNv", "hWsKxXUSU6OxCnEL6jDEM1VAxwk1EWlClEWhwGqH");
})();