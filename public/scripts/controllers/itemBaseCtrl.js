app.controller("itemBaseCtrl", function ($scope, $location,item,loginService,$state) {
// Queries
    console.log("in itemBaseCtrl");
    console.log("Current state " + $state.$current);


    $scope.selectedSlide=0;
    $scope.item=item;
    $scope.page = $scope.item.getPageObject();
    $scope.page.selectedSlide=0;
    $scope.page.selectedResult=0;
    $scope.publish=false;
    if($scope.item.getPublished()){
        $scope.publish=true;
    }

    $scope.editMode = $state.includes('base.itemList.item.edit');
    $scope.myUrl = '#'+$location.url();

    $scope.shareToFacebook= function(){
        var fbpopup = window.open('https://www.facebook.com/sharer/sharer.php?u=quiz22.parseapp.com/i/'+item.id, "pop", "width=600, height=400, scrollbars=no");
    }

    $scope.getLink=function(){
        return 'http://quiz22.parseapp.com/i/'+item.id
    }

    $scope.toggleEdit=function(){
        $scope.editMode=!$scope.editMode;
        if($scope.editMode){
            $state.go('^.edit.slides');
        }else{
            $state.go('^.^.view');
        }
    }

    $scope.publishToggle=function(){
        loginService.login().then(function () {
                $scope.profileImg = loginService.getUserImg();
                $scope.publish=!$scope.publish;
                $scope.item.setPublished($scope.publish);
                $scope.save();

            }, function () {

            }
        );
    }

    $scope.getPublishStr=function(){
        if($scope.publish){
            return "Unpublish";
        }
        return "Publish";
    }

    $scope.cleanUserActivity = function()
    {
        $scope.page.selectedSlide=0;
        $scope.page.slides.forEach(
            function handleSlide(slide)
            {
                slide.isSuccess = undefined;
                slide.isFailed = undefined;

                slide.entities.forEach(
                    function handleEntity(entity)
                    {
                        entity.isSuccess = undefined;
                        entity.isPressed = undefined;
                        entity.isFailed = undefined;
                    }
                )

            }
        )
    }

    $scope.openImageSelector = function (fnSuccess, item, strCrop) {
        uploadcare.openDialog(null, {
            publicKey: "4b4265edeea7c06bf980",
            imagesOnly: true,
            crop: strCrop
        }).done(function (file) {
            if (file) {
                file.done(function (info) {
                    fnSuccess(item, info.cdnUrl);
                });
                $scope.$apply();
            }
        });
    }

    $scope.setPreviewImg = function (item, image) {
        item.previewImg = image;
    }

    $scope.setImgSmall = function (item, image) {
        item.imgSmall = image;
    }

    $scope.save = function () {
        $scope.cleanUserActivity();
        $scope.item.setPageObject($scope.page);
        $scope.item.setUser(Parse.User.current());
        $scope.item.save(null, {
            success: function (object) {
                console.log("Saved with parse id3: " + object.id);
            },
            error: function (model, error) {
                alert("Error" + error);
            }
        });
    };

    $scope.$watch('page',function(newValue, oldValue){
        if($scope.editMode){
            $scope.save();
        }
    },true);

});

