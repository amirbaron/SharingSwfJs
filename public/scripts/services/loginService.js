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
            Parse.FacebookUtils.logIn('email', {
                success: function (user) {
                    userJson = angular.fromJson(user.get('authData'));
                    var faceBookUserId = userJson.facebook.id;
                    var email = userJson.facebook.email;
                    console.log('facebook id ' + faceBookUserId);
                    var profileImg = '//graph.facebook.com/' + faceBookUserId + '/picture';
                    user.set('profileImg', profileImg);
                    user.set('email',email);
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
