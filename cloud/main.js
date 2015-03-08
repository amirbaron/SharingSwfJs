
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
require('cloud/app.js');
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello " + request.params.myName + "!");
});

Parse.Cloud.define("item", function(request, response) {
  var AppPage = Parse.Object.extend("AppPage");
  var query = new Parse.Query(AppPage);
  query.get(request.params.id, {
    success: function(page) {
      response.success(page.get("page"));
    },
    error: function(object, error) {
      response.error("Failed to find page with id: " + request.params.id);
    }
  });


});