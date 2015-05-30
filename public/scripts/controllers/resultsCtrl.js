app.controller("resultsCtrl", function ($scope, $location,  $state) {

    var init = function () {
        if (!$scope.page.results) {
            $scope.page.results=[];
            $scope.page.selectedResult=-1;
            $scope.addResult();
            console.log("Init result method");
        }
    };

    $scope.jumpToResult = function (resultIndex) {
        $scope.page.selectedResult = resultIndex;
    }

    $scope.removeResult = function()
    {
        if ($scope.page.results.length <= 1)
            return;

        $scope.page.results.splice($scope.page.selectedResult,1);
        if ($scope.page.selectedResult >= $scope.page.results.length) {
            $scope.page.selectedResult = $scope.page.results.length - 1
        }
    }

    $scope.addResult = function() {
        if ($scope.page.results.length >= 4)
            return;

        $scope.page.results.splice($scope.page.selectedResult+1, 0, $scope.createDefaultResult());
        $scope.page.selectedResult+=1;
    }

    $scope.createDefaultResult = function()
    {
        return {name: null, text : null, imgSmall : null};
    }

    init();
});