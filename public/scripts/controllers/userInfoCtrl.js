app.controller("userInfoCtrl", function ($scope, $location, userInfoService) {

    userInfoService.getFBInfo().then(function(data) {
        $scope.firstName = data.first_name;
        $scope.lastName=data.last_name;
        $scope.email=data.email;
        $scope.imgUrl='//graph.facebook.com/'+data.id+'/picture?type=large';

    });


});
