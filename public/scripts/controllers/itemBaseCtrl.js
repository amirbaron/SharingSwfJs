app.controller("itemBaseCtrl", function ($scope, $location,item,loginService,$state) {
// Queries
    console.log("in itemBaseCtrl");
    console.log("in itemBaseCtrl selected item is " + item);
    console.log("in itemBaseCtrl selected item is " + item.id);


    $scope.item=item;
    $scope.selectedSlide = 0;
    $scope.page = $scope.item.getPageObject();
    $scope.editMode = false;
    $scope.myUrl = '#'+$location.url();



    $scope.shareToFacebook= function(){
        var fbpopup = window.open('https://www.facebook.com/sharer/sharer.php?u=quiz22.parseapp.com/i/'+item.id, "pop", "width=600, height=400, scrollbars=no");
    }


    $scope.toggleEdit=function(){
        $scope.editMode=!$scope.editMode;
        if($scope.editMode){
            $state.go('.edit.slides');
        }else{
            $state.go('^.^');
        }
    }

    $scope.save = function () {
        loginService.login();
        $scope.item.setPageObject($scope.page);
        $scope.item.setUser(Parse.User.current());
        $scope.item.save(null, {
            success: function (object) {
                console.log("Saved with parse id: " + object.id);
            },
            error: function (model, error) {
                alert("Error" + error);
            }
        });
    };

});

