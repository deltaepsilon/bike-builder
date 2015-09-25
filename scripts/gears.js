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
            tires: [
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