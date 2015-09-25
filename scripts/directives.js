(function() {
    angular.module('BikeBuilderApp').directive('qvHideCurrentLink', function($rootScope, $state, $timeout) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                var sref = attrs.uiSref,
                    hideClass = 'ng-hide',
                    handleStateChange = function(e, state) {
                        if (state.name === sref) {
                            element.addClass(hideClass);
                        } else {
                            element.removeClass(hideClass);
                        }
                    };

                $rootScope.$on('$stateChangeSuccess', handleStateChange);

                $timeout(function() {
                    handleStateChange(false, $state.current);
                });
            }
        };
    });
})();