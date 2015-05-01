app.controller("itemEditorCtrl", function ($scope, $location,$modalInstance,item) {
    // Queries
    console.log("in itemEditorCtrl");
    console.log("in itemEditorCtrl selected item is " + item);
    console.log("in itemEditorCtrl selected item is " + item.id);
    $scope.item=item;
    $scope.selectedSlide = 0;
    $scope.page = $scope.item.getPageObject();
    $scope.editMode = false;
    $scope.myUrl = '#'+$location.url();

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

    $scope.shareToFacebook= function(){
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

