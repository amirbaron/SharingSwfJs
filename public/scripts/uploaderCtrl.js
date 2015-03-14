app.controller("uploaderCtrl", function ($scope, $location) {
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
                console.log("Saved with parse id: " + object.id);
                $scope.clear();
                $scope.$digest();
            },
            error: function (model, error) {
                alert("Error" + error);
            }
        });
    };
    $scope.getItemUrl = function (item) {
        return encodeURI($location.protocol() + "://" + $location.host() + "/item/" + item.objectId + "?title=" + item.title + "&previewImg=" + item.previewImg);
    };

    $scope.searchParam = {
        "sortField": 'updatedAt',
        "ascending": true
    };

    var myObjects = [];
    $scope.getObjects = function () {

        var AppPage = Parse.Object.extend("AppPage");
        var query = new Parse.Query(AppPage);
        query.find({
            success: function (results) {
                var newObjects = [];
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var pageJson = JSON.parse(object.get("page"));
                    newObjects.push({
                        'objectId': object.id,
                        'title': object.get("title"),
                        "previewImg": pageJson.previewImg,
                        'updatedAt': object.updatedAt
                    });

                }
                if(!angular.equals(newObjects, myObjects)){
                    myObjects= newObjects;
                    $scope.$digest();
                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        return myObjects;
    };


    $scope.removeItem = function (guiItem) {
        var AppPage = Parse.Object.extend("AppPage");
        var query = new Parse.Query(AppPage);
        query.get(guiItem.objectId, {
            success: function (page) {
                page.destroy({
                    success: function (page) {
                        console.log("deleted " + guiItem.objectId);
                        $scope.$digest();
                    },
                    error: function (page, error) {
                        console.log("failed to deleted " + guiItem.objectId)
                    }
                });
            },
            error: function (page, error) {
                console.log("Failed to retrieve " + guiItem.objectId)
            }
        });
    }




});