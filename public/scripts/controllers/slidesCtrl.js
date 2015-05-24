app.controller("slidesCtrl", function ($scope, $location,  loginService, $state) {
    // Queries
    console.log("in itemViewerCtrl");
    console.log("in itemViewerCtrl selected item is " + $scope.item);
    console.log("in itemViewerCtrl selected item is " + $scope.item.id);
    //$scope.editMode = false;
    $scope.myUrl = '#' + $location.url();

    $scope.entityClicked = function (entityIndex, itemSelected) {
        if ($scope.editMode)
            return;
        setTimeout(function () {
            $scope.page.selectedSlide++;
            $scope.$apply()
        }, 1000);

        var selectedSlide = $scope.page.slides[$scope.page.selectedSlide];
        var selectedEntity = selectedSlide.entities[entityIndex];

        if (selectedEntity.points == 0) {
            selectedEntity.isFailed = true;
            selectedSlide.isFailed = true;
        }
        else {
            selectedSlide.isSuccess = true;
        }

        selectedSlide.entities.forEach(
            function handleEntity(entity) {
                if (entity.points > 0) {
                    entity.isSuccess = true;
                }
                entity.isPressed = true;
            }
        );
    }

    $scope.jumpToSlide = function (slideIndex) {
        $scope.page.selectedSlide = slideIndex;
    }



    $scope.openImageSelector = function (item, strCrop) {
        uploadcare.openDialog(null, {
            publicKey: "4b4265edeea7c06bf980",
            imagesOnly: true,
            crop: strCrop
        }).done(function (file) {
            if (file) {
                file.done(function (info) {
                    item.imgSmall = info.cdnUrl;
                });
                $scope.$apply();
            }
        });
    }

    $scope.removeSlide = function()
    {
        if ($scope.page.slides.length <= 1)
            return;

        $scope.page.slides.splice($scope.page.selectedSlide,1);
        if ($scope.page.selectedSlide >= $scope.page.slides.length)
            $scope.page.selectedSlide = $scope.page.slides.length-1;
    }



});

