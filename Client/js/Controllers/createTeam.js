
myApp.controller('createTeam',function($scope,$http,$rootScope,$state){


    $scope.newMemberName="";
    $scope.groupName='';
    $scope.groupDesc='';


    $rootScope.allMembers=[];

    $http.get('http://localhost:8000/api/getUsers')
        .success(function(data){


            $rootScope.allMembers=data;

        });




    $scope.addTeamMember=function(){


        $scope.allMembers.push({memberName:$scope.newMemberName});

    };
    $scope.removeTeamMember=function(members){
        $scope.myIndex=$scope.allMembers.indexOf(members);

        $scope.allMembers.splice($scope.myIndex,1);


    };

    $scope.createGroup=function(){
//alert($scope.groupName);

        $http.post('http://localhost:8000/api/addGroup',{
            groupName:$scope.groupName,
            groupData:$scope.groupDesc,
            userTitle: $rootScope.userName
        })
            .success(function(data){
                console.log(data);
                $http.get('http://localhost:8000/api/findGroups')
                    .success(function(data){
                        $rootScope.yourCreatedTeam=[];
                        $rootScope.allTeamData=[];


                        if(data){
                            $rootScope.allGroups=data;
                            for(var i=0;i<$rootScope.allGroups.length;i++)
                            {
                                if($rootScope.allGroups[i].groupOwner==$rootScope.userName)
                                {
                                    $rootScope.yourCreatedTeam.push($rootScope.allGroups[i]);

                                }
                                else{
                                    $rootScope.allTeamData.push($rootScope.allGroups[i]);
                                }
                            }
                        }


                    }
                );


                $state.go('ionBarStripped.yourTeam')

            }
        )
            .error(function(data) {

                console.log('Error in Creating Team');

            }
        )




    }




});
