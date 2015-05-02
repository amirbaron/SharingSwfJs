app.controller("itemTabsCtrl", function ($scope, $location,$state) {
    $scope.activeSlideTab = true;
    $scope.showCover=function(){
        $state.go("^.cover");
    }
    $scope.showSlides=function(){
        $state.go("^.slides");
    }
    $scope.showResults=function(){
        $state.go("^.results");
    }

});

