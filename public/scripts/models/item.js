angular.module('Models')
    .factory('AppPage', function(wrapParse) {
        var AppPage = wrapParse('AppPage', {
            page: String,
            name: String,
            title:String
        });

        AppPage.prototype.beforeSave = function() {
            console.log("Before saving new app page")
        };

        return AppPage;
    });
