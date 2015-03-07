app.controller("quizListCtrl", function ($scope) {
    var AppPage = Parse.Object.extend("AppPage");
    var query = new Parse.Query(AppPage);

    query.find({
        success: function(results) {
            $scope.objects = [];
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                $scope.objects.push({"objectId":object.id,"title":object.get("title")});
            }
            $scope.$apply();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });



});