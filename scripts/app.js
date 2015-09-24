(function() {
    var app = angular.module('BikeBuilderApp', ['firebase', 'ngMaterial', 'ngSanitize', 'ui.router']);

    app.constant('firebaseRoot', window.env.firebaseRoot);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/gears');

        $stateProvider.state('master', {
            url: '/',
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
        }).state('master.gears', {
            url: 'gears',
            templateUrl: 'views/gears.html',
            controller: 'GearsCtrl'
        }).state('master.user', {
            url: 'user',
            templateUrl: 'views/user.html',
            controller: 'UserCtrl'
        });
    });
})();