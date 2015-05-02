app.controller("slidesEditorCtrl", function ($scope, $location,loginService,$state) {
    // Queries
    console.log("in slidesEditorCtrl");


    //$scope.editMode = false;
    $scope.myUrl = '#'+$location.url();



    //$location.jumpToSlide = function(slideIndex) {
    //    $scope.selectedSlide =  slideIndex;
    //}

    //
    //$scope.save = function () {
    //    loginService.login();
    //    $scope.item.setPageObject($scope.page);
    //    $scope.item.setUser(Parse.User.current());
    //    $scope.item.save(null, {
    //        success: function (object) {
    //            console.log("Saved with parse id: " + object.id);
    //        },
    //        error: function (model, error) {
    //            alert("Error" + error);
    //        }
    //    });
    //};

    $scope.openImageSelector = function (item, strCrop) {
       // var file = uploadcare.fileFrom('uploaded', image);
        uploadcare.openDialog(null, {
            publicKey: "4b4265edeea7c06bf980",
            imagesOnly: true,
            crop: strCrop
        }).done(function(file) {
            if (file) {
                file.done(function (info) {
                    item.imgSmall = info.cdnUrl;
                });
                $scope.$apply();
            }
        });
    }


});

