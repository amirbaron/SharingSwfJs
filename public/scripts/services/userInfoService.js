app.service('userInfoService', function ($q) {
    return {
        getFBInfo: function () {
            var dfd = $q.defer();
            var faceBookUserId = angular.fromJson(Parse.User.current().get('authData')).facebook.id;

            FB.api(
                "/"+faceBookUserId,
                function (response) {
                    if (response && !response.error) {
                        dfd.resolve(response);
                    }else{
                        dfd.reject(response.error);
                    }
                }
            );
            return dfd.promise;
        }
    }
});