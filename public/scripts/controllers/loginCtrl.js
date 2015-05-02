app.controller("loginCtrl", function ($scope, $location, loginService) {

    $scope.profileImg=loginService.getUserImg();
    
    $scope.userLoggedIn = function () {
        return loginService.isLoggedIn();
    }

    $scope.login = function () {
        loginService.login();
    }

    $scope.logout = function () {
        loginService.logout();
    }
});
