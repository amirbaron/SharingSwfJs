app.controller("itemViewerCtrl", function ($scope, $location,$modalInstance,item) {
    // Queries
    console.log("in itemViewerCtrl");
    console.log("in itemViewerCtrl selected item is " + item);
    console.log("in itemViewerCtrl selected item is " + item.id);
    $scope.item=item;
    $scope.selectedSlide = 0;
    $scope.page = $scope.item.getPageObject();
    $scope.a = 0;


    $scope.entityClicked = function(entityIndex, itemSelected) {
      //  $scope.selectedSlide++;
        //$scope.page.slides[$scope.selectedSlide].entities[entityIndex];

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

       // $scope.a++;
       // slideVisibility='hideit';
    }



    $scope.jumpToSlide = function(slideIndex) {
        $scope.selectedSlide =  slideIndex; }



});

