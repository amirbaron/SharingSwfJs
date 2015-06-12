app.service('itemService', function ($q) {
    return {
        getCreatorInfo: function (item) {
            var uid = item.getUser()
            var dfd = $q.defer();
            var query = new Parse.Query("User");
            query.get(uid).then(function (result) {
                dfd.resolve(result)
            });
            return dfd.promise;
        }
    }
});