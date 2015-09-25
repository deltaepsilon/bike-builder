(function() {
    angular.module('BikeBuilderApp').controller('MasterCtrl', function($rootScope, $scope, $window, $mdSidenav, $mdToast, $mdDialog, $firebaseAuth, $firebaseArray, $firebaseObject, firebaseRoot) {

        var ref = new Firebase(firebaseRoot),
            authObject = $firebaseAuth(ref),
            toDestroy = [];

        $scope.authObject = authObject;

        $rootScope.registerAuthedObject = function (obj) {
            toDestroy.push(obj);
            return obj;
        };

        $scope.logOut = function() {
            var i = toDestroy.length;

            while (i--) {
                if (typeof toDestroy[i].$destroy === 'function') {
                    toDestroy[i].$destroy();    
                }
            }

            authObject.$unauth();
        };

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.setUser = function(user) {
            if (user) {
                $rootScope.registerAuthedObject(user);
                user.$bindTo($scope, 'user');
                user.$loaded().then(function(user) {
                    console.info('user loaded!', user);
                });
            } else {
                $scope.user = false;
            }
        };

        $scope.alert = function(message) {
            $mdToast.show($mdToast.simple().content(message.toString()).position('false true true false').hideDelay(3000));
        };

        $scope.showLoginDialog = function(e) {
            $mdDialog.show({
                controller: 'LoginCtrl',
                templateUrl: 'views/login-dialog.html',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose: true
            });
        };

        authObject.$onAuth(function(authData) {
            if (!authData) {
                $scope.setUser(false);
            } else {
                $rootScope.registerAuthedObject($firebaseObject(new Firebase(firebaseRoot + 'acl/' + authData.uid))).$loaded().then(function(acl) {
                    acl.lastLogin = (new Date()).toString();
                    acl.provider = authData.provider;

                    if (authData.provider == 'password') {
                        acl.email = authData.password.email;
                    } else if (authData.provider == 'google') {
                        acl.email = authData.google.email;
                    } else if (authData.provider == 'facebook') {
                        acl.email = authData.facebook.email;
                    }

                    acl.$save();
                });

                
                var userKey = $rootScope.registerAuthedObject($firebaseObject(new Firebase(firebaseRoot + 'acl/' + authData.uid + '/userKey')));

                userKey.$watch(function() { // Will trigger if a userKey exists or once it has been created.
                    if (userKey.$value) {
                        $scope.setUser($firebaseObject(new Firebase(firebaseRoot + 'users/' + userKey.$value)));
                    }
                });
            }
        });
    });
})();