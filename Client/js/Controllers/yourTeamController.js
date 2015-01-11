myApp.controller('yourTeamController', function($state,$rootScope,$scope,$ionicModal, $ionicPopup, $timeout,$http) {

    console.log('your team');

    $scope.indexOfGroup='';
    $scope.userName = localStorage.browserUserName;
    $scope.myGroupTitle='';
    $scope.myGroupDesc='';
    $scope.myGroupOwner='';
    $scope.myGroupImage='';


    $scope.projectUrl='';
    $scope.myGroupProjects=[];


    $http.get('http://localhost:8000/api/findGroupNoImage')
        .success(function(data){

            if(data){
                $rootScope.allGroups=data;


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

        $http.post('http://localhost:8000/api/findOneGroup',{groupName:$scope.indexOfGroup})
            .success(function(data){
                $scope.groupInfo=[];


                $scope.groupInfo.push(data);

                $scope.myGroupTitle=$scope.groupInfo[0].groupTitle;
                $scope.myGroupDesc=$scope.groupInfo[0].groupDescription;
                $scope.myGroupOwner=$scope.groupInfo[0].groupOwner;
                $scope.myGroupMembers=$scope.groupInfo[0].groupMembers;
                $scope.myGroupProjects=$scope.groupInfo[0].groupProjects;
                $scope.myGroupImage=$scope.groupInfo[0].imageData.imagePath;
                $scope.myGroupProjects.shift();

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

            .error(function(data){           //This error is generating because I am deleting group from 'Post' Method using remove.

                $http.get('http://localhost:8000/api/findGroupNoImage')
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

    $scope.addTeamProject = function() {

        $scope.project={};

        var alertPopup = $ionicPopup.show({
            title: 'Add Project',
            template: 'Elance Project Name:'+'<br>'+'<input type="text" placeholder="Write Here..." ng-model="project.name">'+'<br> '+
                'Elance Project URL:'+'<br>'+'<input type="text" placeholder="Paste Here..." ng-model="project.url">'+'<br>',
            cssClass: 'addTeamProjectClass',
            scope: $scope,
            buttons: [{
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function()
                {
                    return $scope.project;
                }

            }]

        });
        alertPopup.then(function(res) {
            console.log('Project is Added in the Group');

            $http.post('http://localhost:8000/api/addGroupProjects',{groupName:$scope.indexOfGroup,groupProjectName:$scope.project.name,groupProjectUrl:$scope.project.url})
                .success(function(data){


                    $scope.myGroupProjects=data;

                })
                .error(function(data){

                    console.log('Project is not added');

                })




        });
    };


    $scope.editGroup=function(){

        $rootScope.groupName=$scope.myGroupTitle;
        $rootScope.groupDesc=$scope.myGroupDesc;
        $rootScope.addedMembers=$scope.myGroupMembers;
        $state.go('ionBarStripped.createTeam');
        $scope.modal.hide();


    };

    //This function will be used to reset the Create Team Page

    $scope.emptyCreateTeam=function(){

        $rootScope.groupName='';
        $rootScope.groupDesc='';
        $rootScope.addedMembers=[];

    }




});
