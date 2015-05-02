app.controller("itemViewerCtrl", function ($scope, $location,item,loginService) {
    // Queries
    console.log("in itemViewerCtrl");
    console.log("in itemViewerCtrl selected item is " + item);
    console.log("in itemViewerCtrl selected item is " + item.id);
    $scope.item=item;
    $scope.selectedSlide = 0;
    $scope.page = $scope.item.getPageObject();
    $scope.editMode = false;
    $scope.myUrl = '#'+$location.url();

    $scope.entityClicked = function(entityIndex, itemSelected) {
        setTimeout(function() {
            $scope.selectedSlide++; $scope.$apply()}, 1000);

        var selectedSlide = $scope.page.slides[$scope.selectedSlide];
        var selectedEntity = selectedSlide.entities[entityIndex];

        if (selectedEntity.points == 0)
        {
            selectedEntity.isFailed = true;
            selectedSlide.isFailed = true;
        }
        else
        {
            selectedSlide.isSuccess = true;
        }

        selectedSlide.entities.forEach(
            function handleEntity(entity)
            {
                if (entity.points > 0)
                {
                    entity.isSucess = true;
                }
                entity.isPressed = true;
            }
        );
    }

    $scope.jumpToSlide = function(slideIndex) {
        $scope.selectedSlide =  slideIndex; }

    $scope.shareToFacebook= function(){
        var fbpopup = window.open('https://www.facebook.com/sharer/sharer.php?u=quiz22.parseapp.com/i/'+item.id, "pop", "width=600, height=400, scrollbars=no");
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

    $scope.openImageSelector = function (image) {
        var file = uploadcare.fileFrom('uploaded', image);
        uploadcare.openDialog(file, {
            publicKey: "4b4265edeea7c06bf980",
            imagesOnly: true,
            crop: "468:263 minimum"
        }).done(function(file) {
            if (file) {
                file.done(function (info) {
                    $scope.page.slides[$scope.selectedSlide].imgSmall = info.cdnUrl;
                });
                $scope.$apply();
            }
        });
    }

});

