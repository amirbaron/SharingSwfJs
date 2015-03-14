app.controller("uploaderCtrl", function ($scope,$location) {
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
    $scope.getItemUrl = function(item){
      return encodeURI($location.protocol()+"://"+$location.host()+"/item/"+item.objectId+"?title="+item.title+"&logoImg="+item.logoImg);
    };

    $scope.searchParam={
        "sortField":'title',
        "ascending" :true
    }


    var AppPage = Parse.Object.extend("AppPage");
    var query = new Parse.Query(AppPage);

    query.find({
        success: function(results) {
            $scope.objects = [];
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var pageJson = JSON.parse(object.get("page"));
                $scope.objects.push({'objectId':object.id,'title':object.get("title"),"previewImg":pageJson.previewImg});
            }
            $scope.$apply();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });


});