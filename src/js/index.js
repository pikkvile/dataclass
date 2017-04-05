const DataClass = angular.module('DataClass', []);

DataClass.controller('IndexCtrl', ($scope, parser) => {
    $scope.src = 'Test: int i, title;\nNotification: to, from, long sentAt, NotificationDeliveryChannel deliveryChannel, body;';
    $scope.parse = () => {
        $scope.target = parser.parse($scope.src);
    };
    $scope.parse();
});

DataClass.service('parser', function() {

    this.parse = (src) => {
        var classes = src.split(';');
        return classes.filter(clsSrc => !!clsSrc).map((clsSrc) => {
            clsSrc = clsSrc.trim();
            return {
                className: clsSrc.split(':')[0].trim(),
                fields: parseFields(clsSrc.split(':')[1].trim())
            };
        });
    };
    
    function parseFields(fSrc) {
        return fSrc.split(',')
            .map(fsrc => fsrc.trim())
            .map(fsrc => {
                const fArray = fsrc.split(' ');
                return {
                    type: fArray.length == 2 ? fArray[0].trim() : 'String',
                    name: fArray[fArray.length - 1],
                    gsName: capitalize(fArray[fArray.length - 1])
                };
            });
    }

    const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase();
});