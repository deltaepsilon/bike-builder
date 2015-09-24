(function() {
    var app = angular.module('BikeBuilderApp', ['firebase', 'ngMaterial', 'ngSanitize', 'ui.router']);

    app.constant('firebaseRoot', window.env.firebaseRoot);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('master', {
            url: '/',
            views: {
                toolbar: {
                    templateUrl: 'views/toolbar.html',
                    controller: 'ToolbarCtrl'
                },
                sidenav: {
                    templateUrl: 'views/sidenav.html',
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: 'views/content.html',
                    controller: 'ContentCtrl'
                }
            }
        })
    });
})();