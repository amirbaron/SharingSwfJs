app.controller("coverCtrl", function ($scope, $location,  $state) {
    $scope.title= $scope.item.getTitle()

    $scope.$watch('title', function(newValue, oldValue){
        if(newValue!=$scope.item.getTitle()){
            console.log("Title value was changed")
            $scope.item.setTitle(newValue);
            $scope.save();
        }
    },true);

});