(function() {
    angular.module('BikeBuilderApp').controller('MasterCtrl', function($scope, $window, $mdSidenav, $mdToast, $mdDialog, $firebaseAuth, $firebaseArray, $firebaseObject, firebaseRoot) {

        var ref = new Firebase(firebaseRoot),
            authObject = $firebaseAuth(ref);

        $scope.authObject = authObject;

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.setUser = function(user) {
            if (user) {
                user.$bindTo($scope, 'user'); // Creates 3-way bind to from $scope.user to my-firebase.com/users/###userKey###
                user.$loaded().then(function(user) { // Waits for user object to be loaded from Firebase socket
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
            console.info('authData received', authData);
            if (!authData) {
                // Sets user to falsy if no authData received, indicated that the user is logged out
                $scope.setUser(false);
            } else {
                // Creates a matching ACL entry for this successful login
                var acl = $firebaseObject(new Firebase(firebaseRoot + 'acl/' + authData.uid));
                acl.$loaded().then(function(acl) {
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

                // Will trigger if a userKey exists or once it has been created.
                var userKey = $firebaseObject(new Firebase(firebaseRoot + 'acl/' + authData.uid + '/userKey'));
                userKey.$watch(function() {
                    if (userKey.$value) {
                        var userRef = new Firebase(firebaseRoot + 'users/' + userKey.$value),
                            user = $firebaseObject(userRef);

                        $scope.setUser(user);
                    }
                });
            }
        });
    });
})();