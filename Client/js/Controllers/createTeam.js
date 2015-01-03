
myApp.controller('createTeam',function($scope,$http,$rootScope,$state){



    $scope.groupName='';
    $scope.groupDesc='';

    $rootScope.addedMembers=[];
    $rootScope.allUsers=[];
    $scope.memberName=$rootScope.userName;

    $http.get('http://localhost:8000/api/getUsers')
        .success(function(data){


            $rootScope.allUsers=data;

            //Here logic is written to prevent owner name in the add Team User List in 'Create your Team Tab'

            for(var i=0;i<$rootScope.allUsers.length;i++)
            {
                if($rootScope.allUsers[i].fb_title==$rootScope.userName){

                    $rootScope.allUsers.splice(i,1);

                }
            }

            //Logic Ends


        });


    $scope.addTeamMember=function(){


        $rootScope.addedMembers.push($scope.memberName.fb_title);

    };
    $scope.removeTeamMember=function(members){
        $scope.myIndex=$rootScope.addedMembers.indexOf(members);

        $rootScope.addedMembers.splice($scope.myIndex,1);


    };

    $scope.createGroup=function(){


        $http.post('http://localhost:8000/api/addGroup',{
            groupName:$scope.groupName,
            groupData:$scope.groupDesc,
            userTitle: $rootScope.userName,
            addedMembers:$rootScope.addedMembers
        })
            .success(function(data){
                console.log(data.code);
                $scope.sameTeamName=data.code;



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


                    }
                );

                if($scope.sameTeamName!=403){
                    $state.go('ionBarStripped.yourTeam');
                }
                else{
                    alert('Team Name is already in use');
                }
            }
        )
            .error(function(data) {

                console.log('Error in Creating Team');

            }
        )




    }




});
