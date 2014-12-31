myApp.controller('yourTeamController', function($rootScope,$scope,$ionicModal, $ionicPopup, $timeout,$http) {



    $ionicModal.fromTemplateUrl('templates/teamInfo.html', {
        scope: $scope
    }).then(function(modal) {
            $scope.modal = modal
        });

    $scope.openModal = function(myTeams) {
        console.log('hello');

        $scope.modal.show(myTeams);
    };

    $scope.closeModal = function() {
        $scope.modal.hide()
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove()
    });

    //Popup to show Team Members

    $scope.showPopup = function() {


        var myPopup = $ionicPopup.show({
            template: '<ul ng-repeat="members in appData.allTeams" class="row memberNamesDisplay">' +
             //   '<li class="col">{{dataService.teamName}}</li>' +

                '</ul> ',
            title: 'Members',
            subTitle: 'Admin is: Zubair',
            scope: $scope,
            buttons: [

                {
                    text: '<b>Okay</b>',
                    type: 'button-positive'

                }
            ]
        });
        myPopup.then(function(res) {

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 10 seconds for some reason
        }, 10000);
    };



});
