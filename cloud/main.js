// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
require('cloud/app.js');
Parse.Cloud.define("hello", function (request, response) {
    response.success("Hello " + request.params.myName + "!");
});

Parse.Cloud.define("item", function (request, response) {
    var AppPage = Parse.Object.extend("AppPage");
    var query = new Parse.Query(AppPage);
    query.get(request.params.id, {
        success: function (page) {
            response.success(page.get("page"));
        },
        error: function (object, error) {
            response.error("Failed to find page with id: " + request.params.id);
        }
    });


});

var _ = require("underscore");
Parse.Cloud.beforeSave("AppPage", function (request, response) {
    var appPage = request.object;

    var toLowerCase = function (w) {
        return w.toLowerCase();
    };

    //var words = appPage.get("text").split(/b/);
    //words = _.map(words, toLowerCase);
    //var stopWords = ["the", "in", "and"]
    //words = _.filter(words, function(w) { return w.match(/^w+$/) && ! _.contains(stopWords, w); });

    var hashtags = appPage.get("tags").match(/#.+?\b/g);
    hashtags = _.map(hashtags, toLowerCase);
    console.log("hashtags " + hashtags);
    //appPage.set("words", words);
    appPage.set("hashtags", hashtags);
    response.success();
});
