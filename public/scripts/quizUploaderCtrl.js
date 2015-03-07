app.controller("quizUploaderCtrl", function ($scope) {
    $scope.message = "";
    $scope.numberOfChars = function () {
        return $scope.message.length;
    };
    $scope.clear = function () {
        $scope.message = "";
    };
    $scope.save = function () {
        var AppPage = Parse.Object.extend("AppPage");
        var appPage = new AppPage();
        var pageJson = JSON.parse($scope.message);
        appPage.set("page", $scope.message);
        appPage.set("name", pageJson.name);
        appPage.set("title", pageJson.title);

        appPage.save(null, {
            success: function (object) {
                alert("Saved with parse id: " + object.id);
            },
            error: function (model, error) {
                alert("Error" + error);
            }
        });


    };

});