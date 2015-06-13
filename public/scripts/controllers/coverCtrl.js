app.controller("coverCtrl", function ($scope, $location,  $state) {
    $scope.title= $scope.item.getTitle()
    $scope.$watch('title', function(newValue, oldValue){
        if(newValue!=$scope.item.getTitle()){
            console.log("Title value was changed")
            $scope.item.setTitle(newValue);
            $scope.save();
        }
    },true);

    $scope.tags=$scope.item.getHashtags();
    //$scope.tags=$scope.item.getTags();

    $scope.$watch('tags', function(newValue, oldValue){
        if(newValue!=oldValue){
            console.log("Saving tags")
            $scope.item.setHashtags(newValue);
            $scope.save();
        }
    },true);
});