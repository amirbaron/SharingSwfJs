app.service('loginService', function ($q) {
    Parse.Object.extend({
        className: "User",
        attrs: ['profileImg']
    });

    return {
        login: function () {
            if (this.isLoggedIn()) {
                return;
            }
            // Run code after the Facebook SDK is loaded.
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    var faceBookUserId = angular.fromJson(user.get('authData')).facebook.id;
                    console.log('facebook id ' + faceBookUserId);
                    var profileImg = '//graph.facebook.com/' + faceBookUserId + '/picture';
                    user.set('profileImg', profileImg);
                    user.save();
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
        },

        getUserImg: function () {
            if (this.isLoggedIn()) {
                return Parse.User.current().get('profileImg');
            }
            return null;
        }
    }
})
