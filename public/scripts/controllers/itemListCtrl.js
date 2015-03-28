app.controller("itemListCtrl", function ($scope, $location) {
    // Queries
    console.log("in itemListCtrl");
    Parse.Object.extend({
        className: "AppPage",
        attrs: ['page', 'name', 'title','type']
    });

    var query = new Parse.Query("AppPage");
    query.find()
        .then(function (result) {
            $scope.appPages = result;
        });
// Cloud Code is patched too!
//        Parse.Cloud.run("myCloudCodeFunction", function (results) {
//            $scope.data = results;
//        });

    var collection = Parse.Collection.extend({
        model: Parse.User
    });

    var myPages = new collection();
    myPages.query = new Parse.Query('AppPage');
    myPages.query.limit(50);
// Let's load the 50 first users in our collection
    myUsers.fetch()
        .then(function(){
            $scope.appPages = result;
            // myUsers.length == 50
            // Cool, let's load 50 more
            myUsers.loadMore()
                .then(function(newData){
                    // newData contains here the 50 next models (newly fetched ones)
                    // but they've also been added to the collection ()myUsers.length == 100)
                    // myUsers.query's skip is now 100
                });
        });


});