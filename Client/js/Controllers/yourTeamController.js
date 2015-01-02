myApp.controller('yourTeamController', function($state,$rootScope,$scope,$ionicModal, $ionicPopup, $timeout,$http) {


$rootScope.indexOfGroup='';

    $scope.myGroupTitle='';
    $scope.myGroupDesc='';
    $rootScope.groupInfo=[];



    $ionicModal.fromTemplateUrl('templates/teamInfo.html', {
        scope: $scope

    }).then(function(modal) {
            $scope.modal = modal
        });

    $scope.openModal = function(index) {
        console.log('Modal is called');

        $rootScope.indexOfGroup=index;

        $http.get('http://localhost:8000/api/findGroups')
            .success(function(data){
                $rootScope.groupInfo=[];

                $rootScope.groupInfo.push(data[$rootScope.indexOfGroup])

                $scope.myGroupTitle=$rootScope.groupInfo[0].groupTitle;
                $scope.myGroupDesc=$rootScope.groupInfo[0].groupDescription;

            });


        $scope.modal.show();
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
