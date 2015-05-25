app.controller("slidesCtrl", function ($scope, $location,  loginService, $state) {



    var initM = function () {
        if (!$scope.page.slides) {
            $scope.page.slides=[];
            $scope.page.selectedSlide=-1;
            $scope.addSlide();
            console.log("Init method");
        }
    };

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

    $scope.createDefaultEntity = function()
    {
        var emptySlide = {text : "", imgSmall : "", entities : []}

    }

    $scope.createDefaultSlide = function()
    {
        var emptySlide = {text : null, imgSmall : null, entities : []}
        emptySlide.entities.push($scope.createDefaultEntity());
        emptySlide.entities.push($scope.createDefaultEntity());

        return emptySlide;
    }

    $scope.createDefaultEntity = function()
    {
        return {imgSmall : null, title : null, points : 0};
    }

    $scope.removeSlide = function()
    {
        if ($scope.page.slides.length <= 1)
            return;

        $scope.page.slides.splice($scope.page.selectedSlide,1);
        if ($scope.page.selectedSlide >= $scope.page.slides.length)
            $scope.page.selectedSlide = $scope.page.slides.length-1;
    }

    $scope.removeEntity = function(entityIndex)
    {
        $scope.page.slides[$scope.page.selectedSlide].entities.splice(entityIndex, 1);
    }

    $scope.addEntity = function()
    {
        $scope.page.slides[$scope.page.selectedSlide].entities.push($scope.createDefaultEntity());
    }

    $scope.addSlide = function() {
        if ($scope.page.slides.length >= 10)
            return;

        $scope.page.slides.splice($scope.page.selectedSlide+1, 0, $scope.createDefaultSlide());
        $scope.page.selectedSlide+=1;
    }

    initM();



});

