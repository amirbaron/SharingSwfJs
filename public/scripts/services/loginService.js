app.service('loginService', function ($q) {
    return {
        login: function () {
            if (this.isLoggedIn()) {
                return;
            }
            // Run code after the Facebook SDK is loaded.
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                },
                error: function (user, error) {
                }
            });
        },
        isLoggedIn: function () {
            if (Parse.User.current()) {
                return true;
            }
            else {
                return false;
            }
        },
        logout: function () {
            if (this.isLoggedIn()) {
                Parse.User.logOut();
            }
            return;
        }
    }
})
