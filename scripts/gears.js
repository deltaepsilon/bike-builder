(function() {
    angular.module('BikeBuilderApp').controller('GearsCtrl', function($scope, $firebaseObject, $firebaseArray, firebaseRoot, user, $mdDialog, $localStorage) {
        $scope.$storage = $localStorage;


        if (!$scope.$storage.gearsViewState) {
            $scope.$storage.gearsViewState = 'editing';
        }

        $scope.toggleEdit = function() {
            if (!$scope.$storage.gearsViewState || $scope.$storage.gearsViewState !== 'editing') {
                $scope.$storage.gearsViewState = 'editing';
            } else {
                $scope.$storage.gearsViewState = 'viewing';
            }
        }

        $scope.parameters = {
            chainring: {
                min: 20,
                max: 65
            },
            cog: {
                min: 10,
                max: 42
            },
            tires: [ // http://www.cateye.com/data/resources/Tire_size_chart_ENG.pdf
                {etrto: '47-203', size: '12x1.75', circumference: '935'},
                {etrto: '54-203', size: '12x1.95', circumference: '940'},
                {etrto: '40-254', size: '14x1.50', circumference: '1020'},
                {etrto: '47-254', size: '14x1.75', circumference: '1055'},
                {etrto: '40-305', size: '16x1.50', circumference: '1185'},
                {etrto: '47-305', size: '16x1.75', circumference: '1195'},
                {etrto: '54-305', size: '16x2.00', circumference: '1245'},
                {etrto: '28-349', size: '16x1-1/8', circumference: '1290'},
                {etrto: '37-349', size: '16x1-3/8', circumference: '1300'},
                {etrto: '32-369', size: '17x1-1/4', circumference: '1340'},
                {etrto: '40-355', size: '18x1.50', circumference: '1340'},
                {etrto: '47-355', size: '18x1.75', circumference: '1350'},
                {etrto: '32-406', size: '20x1.25', circumference: '1450'},
                {etrto: '35-406', size: '20x1.35', circumference: '1460'},
                {etrto: '40-406', size: '20x1.50', circumference: '1490'},
                {etrto: '47-406', size: '20x1.75', circumference: '1515'},
                {etrto: '50-406', size: '20x1.95', circumference: '1565'},
                {etrto: '28-451', size: '20x1-1/8', circumference: '1545'},
                {etrto: '37-451', size: '20x1-3/8', circumference: '1615'},
                {etrto: '37-501', size: '22x1-3/8', circumference: '1770'},
                {etrto: '40-501', size: '22x1-1/2', circumference: '1785'},
                {etrto: '47-507', size: '24x1.75', circumference: '1890'},
                {etrto: '50-507', size: '24x2.00', circumference: '1925'},
                {etrto: '54-507', size: '24x2.125', circumference: '1965'},
                {etrto: '25-520', size: '24x1', circumference: '1753'},
                {etrto: '', size: '24x3/4 Tubular', circumference: '1785'},
                {etrto: '28-540', size: '24x1-1/8', circumference: '1795'},
                {etrto: '32-540', size: '24x1-1/4', circumference: '1905'},
                {etrto: '25-559', size: '26x1.00', circumference: '1913'},
                {etrto: '32-559', size: '26x1.25', circumference: '1950'},
                {etrto: '37-559', size: '26x1.40', circumference: '2005'},
                {etrto: '40-559', size: '26x1.50', circumference: '2010'},
                {etrto: '47-559', size: '26x1.75', circumference: '2023'},
                {etrto: '50-559', size: '26x1.95', circumference: '2050'},
                {etrto: '54-559', size: '26x2.10', circumference: '2068'},
                {etrto: '57-559', size: '26x2.125', circumference: '2070'},
                {etrto: '58-559', size: '26x2.35', circumference: '2083'},
                {etrto: '75-559', size: '26x3.00', circumference: '2170'},
                {etrto: '28-590', size: '26x1-1/8', circumference: '1970'},
                {etrto: '37-590', size: '26x1-3/8', circumference: '2068'},
                {etrto: '37-584', size: '26x1-1/2', circumference: '2100'},
                {etrto: '', size: '650C Tubular 26x7/8', circumference: '1920'},
                {etrto: '20-571', size: '650x20C', circumference: '1938'},
                {etrto: '23-571', size: '650x23C', circumference: '1944'},
                {etrto: '25-571', size: '650x25C 26x1', circumference: '1952'},
                {etrto: '40-590', size: '650x38A', circumference: '2125'},
                {etrto: '40-584', size: '650x38B', circumference: '2105'},
                {etrto: '25-630', size: '27x1', circumference: '2145'},
                {etrto: '28-630', size: '27x1-1/8', circumference: '2155'},
                {etrto: '32-630', size: '27x1-1/4', circumference: '2161'},
                {etrto: '37-630', size: '27x1-3/8', circumference: '2169'},
                {etrto: '40-584', size: '27.5x1.50', circumference: '2079'},
                {etrto: '54-584', size: '27.5x2.10', circumference: '2148'},
                {etrto: '57-584', size: '27.5x2.25', circumference: '2182'},
                {etrto: '18-622', size: '700x18C', circumference: '2070'},
                {etrto: '19-622', size: '700x19C', circumference: '2080'},
                {etrto: '20-622', size: '700x20C', circumference: '2086'},
                {etrto: '23-622', size: '700x23C', circumference: '2096'},
                {etrto: '25-622', size: '700x25C', circumference: '2105'},
                {etrto: '28-622', size: '700x28C', circumference: '2136'},
                {etrto: '30-622', size: '700x30C', circumference: '2046'},
                {etrto: '32-622', size: '700x32C', circumference: '2155'},
                {etrto: '', size: '700C Tubular', circumference: '2130'},
                {etrto: '35-622', size: '700x35C', circumference: '2168'},
                {etrto: '38-622', size: '700x38C', circumference: '2180'},
                {etrto: '40-622', size: '700x40C', circumference: '2200'},
                {etrto: '42-622', size: '700x42C', circumference: '2224'},
                {etrto: '44-622', size: '700x44C', circumference: '2235'},
                {etrto: '45-622', size: '700x45C', circumference: '2242'},
                {etrto: '47-622', size: '700x47C', circumference: '2268'},
                {etrto: '54-622', size: '29x2.1', circumference: '2288'},
                {etrto: '56-622', size: '29x2.2', circumference: '2298'},
                {etrto: '60-622', size: '29x2.3', circumference: '2326'}
            ]
        };

        $scope.gearings = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id));

        $scope.addGearing = function() {
            var created = (new Date()).toString(),
                gearingRef;

            $scope.gearings.$add({
                created: created
            }).then(function(ref) {
                gearingRef = ref;
                return $firebaseArray(gearingRef.child('chainrings')).$add({
                    created: created,
                    teeth: 20
                });
            }).then(function(ref) {
                return $firebaseArray(gearingRef.child('cogs')).$add({
                    created: created,
                    teeth: 20
                });
            });
        };

        $scope.saveGearing = function(gearing) {
            $scope.gearings.$save(gearing);
        };

        $scope.removeGearing = function(e, gearing) {
            $mdDialog.show($mdDialog.confirm().title('Remove Gearing?').ariaLabel('Remove Gearing').targetEvent(e).ok('Remove').cancel('Save')).then(function() {
                $scope.gearings.$remove(gearing);
            });
        };

        $scope.addChainring = function(gearing) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                chainrings = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/chainrings'));
            chainrings.$add({
                created: (new Date()).toString(),
                teeth: 20,
                name: 'Unnamed'
            });
        };

        $scope.saveChainring = function(gearing, index, teeth) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                chainrings = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/chainrings'));

            chainrings.$loaded().then(function(chainrings) {
                var chainring = chainrings.$getRecord(chainrings.$keyAt(index));
                chainring.teeth = teeth;
                return chainrings.$save(chainring);
            }).then(function() {

            }, function(err) {
                console.warn(err);
            });
        };

        $scope.removeChainring = function(gearing, index) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                chainrings = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/chainrings'));

            chainrings.$loaded().then(function(chainrings) {
                return chainrings.$remove(index);
            }).then(function() {

            }, function(err) {
                console.warn(err);
            });
        };

        $scope.addCog = function(gearing) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                cogs = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/cogs'));
            cogs.$add({
                created: (new Date()).toString(),
                teeth: 20
            });
        };

        $scope.saveCog = function(gearing, index, teeth) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                cogs = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/cogs'));

            cogs.$loaded().then(function(cogs) {
                var cog = cogs.$getRecord(cogs.$keyAt(index));
                cog.teeth = teeth;
                return cogs.$save(cog);
            }).then(function() {

            }, function(err) {
                console.warn(err);
            });
        };

        $scope.removeCog = function(gearing, index) {
            var gearingKey = $scope.gearings.$keyAt(gearing),
                cogs = $firebaseArray(new Firebase(firebaseRoot + 'userObjects/gearings/' + user.$id + '/' + gearingKey + '/cogs'));

            cogs.$loaded().then(function(chainrings) {
                return cogs.$remove(index);
            }).then(function() {

            }, function(err) {
                console.warn(err);
            });
        };
    });
})();