var app = angular.module("quizApp", ['ngClipboard','ngRoute', 'ng-uploadcare']);
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
    // Initialize Parse
    Parse.initialize("BZ5XSiStXyIe6ukM9iuZwPg3rOeRz8l2yQDweSNv", "hWsKxXUSU6OxCnEL6jDEM1VAxwk1EWlClEWhwGqH");

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId      : '{631811150283745}', // Facebook App ID
            status     : true,  // check Facebook Login status
            cookie     : true,  // enable cookies to allow Parse to access the session
            xfbml      : true,  // initialize Facebook social plugins on the page
            version    : 'v2.2' // point to the latest Facebook Graph API version
        });

        // Run code after the Facebook SDK is loaded.
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


})();
