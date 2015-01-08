myApp.controller('allTeamController', function($rootScope,$scope,$ionicModal, $ionicPopup, $timeout,$http, $state) {


    console.log('all team');

    $rootScope.indexOfGroup='';

    $scope.myGroupTitle='';
    $scope.myGroupDesc='';

    $scope.userName = localStorage.browserUserName;

    $http.get('http://localhost:8000/api/findGroupNoImage')
        .success(function(data){

            if(data){
                $scope.allGroups=data;


            }


        }
    );

    $ionicModal.fromTemplateUrl('templates/teamInfo.html', {
        scope: $scope

    }).then(function(modal) {
            $scope.modal = modal
        });

    $scope.openModal = function(index) {

        console.log('Modal is called');

        $scope.indexOfGroup=index;

        $http.get('http://localhost:8000/api/findGroups')
            .success(function(data){
                $scope.allTeamsGroupInfo=[];


                $scope.allTeamsGroupInfo.push(data[$scope.indexOfGroup])

                $scope.myGroupTitle=$scope.allTeamsGroupInfo[0].groupTitle;
                $scope.myGroupDesc=$scope.allTeamsGroupInfo[0].groupDescription;
                $scope.myGroupOwner=$scope.allTeamsGroupInfo[0].groupOwner;
                $scope.myGroupMembers=$scope.allTeamsGroupInfo[0].groupMembers;

            });


        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide()
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove()
    });







    $scope.removeGroup=function(myGroupName){

        $http.post('http://localhost:8000/api/deleteGroup',{groupName:myGroupName})
            .success(function(data){
                console.log(data);
            })

            .error(function(data){

                $http.get('http://localhost:8000/api/findGroups')
                    .success(function(data){
                        $rootScope.yourCreatedTeam=[];
                        $rootScope.allTeamData=[];


                        if(data){
                            $rootScope.allGroups=data;



                            for(var j=0;j<$rootScope.allGroups.length;j++)
                            {

                                if($rootScope.allGroups[j].groupOwner==$rootScope.userName)
                                {
                                    $rootScope.yourCreatedTeam.push($rootScope.allGroups[j]);

                                }

                                else

                                {
                                    $rootScope.allTeamData.push($rootScope.allGroups[j]);
                                }




                            }
                        }



                    });

                $scope.modal.hide();
            });
    };

    //Popup to show Team Members

    $scope.showAlert = function() {

        var alertPopup = $ionicPopup.alert({
            title: 'Group Admin is:'+$scope.myGroupOwner,
            template: 'Group Members Are:'+'<br>'+$scope.myGroupMembers
        });
        alertPopup.then(function(res) {
            console.log('Members Shown');
        });
    };


    $scope.editGroup=function(){

        $rootScope.groupName=$scope.myGroupTitle;
        $rootScope.groupDesc=$scope.myGroupDesc;
        $rootScope.addedMembers=$scope.myGroupMembers;
        $state.go('ionBarStripped.createTeam');
        $scope.modal.hide();


    };

});
