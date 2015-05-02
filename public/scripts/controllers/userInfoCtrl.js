app.controller("userInfoCtrl", function ($scope, $location, userInfoService) {

    $scope.firstName= 'foo';
    userInfoService.getFirstName().then(function(data) {
        $scope.firstName = data;
    });


});
