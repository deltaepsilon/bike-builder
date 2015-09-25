(function() {
    angular.module('BikeBuilderApp').controller('LoginCtrl', function($scope, $firebaseAuth, $firebaseObject, firebaseRoot, $mdToast, $mdDialog) {
        var ref = new Firebase(firebaseRoot),
            authObject = $firebaseAuth(ref), 
            showAlert = function (message) {
                $mdToast.show($mdToast.simple().content(message.toString()).position('false true true false').hideDelay(3000));
            };

        authObject.$onAuth(function (authData) {
            if (authData) {
                $mdDialog.hide();    
            }
        });

        $scope.toggleRegistration = function () {
            $scope.isRegistering = !$scope.isRegistering;  
        };

        $scope.google = function() {
            authObject.$authWithOAuthPopup('google', {
                scope: 'email'
            }).then(function(authData) {
                console.log('google success', authData);
            }, function(err) {
                console.warn('google error', err);
            });
        };

        $scope.facebook = function() {
            authObject.$authWithOAuthPopup('facebook', {
                scope: 'email'
            }).then(function(authData) {
                console.log('facebook success', authData);
            }, function(err) {
                console.warn('facebook error', err);
            });
        };

        $scope.login = function(loginUser) { // loginUser = {email: 'someemail@gmail.com', password: 'somepassword'};
            authObject.$authWithPassword(loginUser).then(function() {
                showAlert('Login successful!');
            }, function(error) {
                showAlert(error);
            });
        };

        $scope.register = function(loginUser) { // loginUser = {email: 'someemail@gmail.com', password: 'somepassword'};
            authObject.$createUser(loginUser).then(function() {
                $scope.login(loginUser);
            }, function(error) {
                showAlert(error);
            });
        };
    });
})();