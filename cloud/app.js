
// These two lines are required to initialize Express in Cloud Code.

var express = require('express');

var app = express();


// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/item/:id', function(req, res) {
  var AppPage = Parse.Object.extend("AppPage");
  var query = new Parse.Query(AppPage);
  query.get(req.params.id, {
    success: function(page) {
      var pageJson = JSON.parse(page.get("page"));
      res.render('quiz', {id:req.params.id,title:pageJson.title,previewImg:pageJson.previewImg});

    },
    error: function(object, error) {
      console.error("Failed to find page with id: " + req.params.id);
      res.status(500).send('Something broke!');
    }
  });

});

app.get('/i/:id', function(req, res) {
  var AppPage = Parse.Object.extend("AppPage");
  var query = new Parse.Query(AppPage);
  query.get(req.params.id, {
    success: function(page) {
      var pageJson = JSON.parse(page.get("page"));
      res.render('quiz', {id:req.params.id,title:pageJson.title,previewImg:pageJson.previewImg});

    },
    error: function(object, error) {
      console.error("Failed to find page with id: " + req.params.id);
      res.status(500).send('Something broke!');
    }
  });

});


// Attach the Express app to Cloud Code.
app.listen();
