(function() {
    var app = angular.module('BikeBuilderApp', ['firebase', 'ngMaterial', 'ngSanitize', 'ui.router', 'ngStorage']);

    app.constant('firebaseRoot', window.env.firebaseRoot);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('master', {
                abstract: true,
                views: {
                    toolbar: {
                        templateUrl: 'views/toolbar.html',
                        controller: 'ToolbarCtrl'
                    },
                    // sidenav: {
                    //     templateUrl: 'views/sidenav.html',
                    //     controller: 'SidenavCtrl'
                    // },
                    content: {
                        templateUrl: 'views/content.html',
                        controller: 'ContentCtrl'
                    }
                }
            }).state('master.landing', {
                url: '/',
                templateUrl: 'views/landing.html',
                resolve: {
                    user: function($q, $firebaseAuth, firebaseRoot, $state) {
                        var deferred = $q.defer();

                        $firebaseAuth(new Firebase(firebaseRoot)).$onAuth(function(authData) {
                            if (authData) {
                                $state.go('master.auth.gears');
                                deferred.reject();
                            } else {
                                deferred.resolve();
                            }
                        });

                        return deferred.promise;
                    }
                }
            })
            .state('master.auth', {
                abstract: true,
                url: '/',
                template: '<div ui-view></div>',
                resolve: {
                    user: function($rootScope, $q, $firebaseAuth, $firebaseObject, firebaseRoot, $state) {
                        var deferred = $q.defer();

                        $firebaseAuth(new Firebase(firebaseRoot)).$onAuth(function(authData) {
                            if (!authData) {
                                deferred.reject($state.go('master.landing'));
                            } else {
                                $rootScope.registerAuthedObject($firebaseObject(new Firebase(firebaseRoot + 'acl/' + authData.uid))).$loaded(function (acl) {
                                    deferred.resolve($rootScope.registerAuthedObject($firebaseObject(new Firebase(firebaseRoot + 'users/' + acl.userKey))));
                                });
                            }
                        });

                        return deferred.promise;
                    }
                }
            })
            .state('master.auth.gears', {
                url: 'gears',
                templateUrl: 'views/gears.html',
                controller: 'GearsCtrl'
            }).state('master.auth.user', {
                url: 'user',
                templateUrl: 'views/user.html',
                controller: 'UserCtrl'
            });
    });
})();