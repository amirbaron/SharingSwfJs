app.controller("loginCtrl", function ($scope, $location, loginService) {

    $scope.profileImg=loginService.getUserImg();

    $scope.userLoggedIn = function () {
        return loginService.isLoggedIn();
    }

    $scope.login = function () {
        loginService.login();
        $scope.profileImg=loginService.getUserImg();
    }

    $scope.logout = function () {
        loginService.logout();
    }
});
