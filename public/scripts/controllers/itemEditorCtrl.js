app.controller("itemEditorCtrl", function ($scope, $location,item) {
    // Queries
    console.log("in itemEditorCtrl");
    console.log("in itemEditorCtrl selected item is " + item);
    console.log("in itemEditorCtrl selected item is " + item.id);
    $scope.item=item;
    $scope.selectedSlide = 0;
    $scope.page = $scope.item.getPageObject();
    $scope.myUrl = '#'+$location.url();
    $scope.editMode=true;


    $scope.jumpToSlide = function(slideIndex) {
        $scope.selectedSlide =  slideIndex; }

    $scope.shareToFacebook= function(){
        if(!Parse.User.current()){
            console.log("$scope.$parent.login is " + $scope.$parent.login);
        }
        var fbpopup = window.open('https://www.facebook.com/sharer/sharer.php?u=quiz22.parseapp.com/i/'+item.id, "pop", "width=600, height=400, scrollbars=no");

    }

    $scope.save = function () {
        $scope.item.setPageObject($scope.page);
        if(!Parse.User.current()){
            console.log("$scope.$parent.login is " + $scope.$parent.login);
        }
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

