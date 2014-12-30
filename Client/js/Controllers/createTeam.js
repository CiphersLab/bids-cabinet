
myApp.controller('createTeam',function($scope,$http,$rootScope,$state,appData){
    $rootScope.myCreatedTeam=appData.getTeamData()[0];

    $scope.newMemberName="";
    $scope.groupName='';
    $scope.groupDesc='';


    $scope.allMembers=[{

        memberName:'member1'
    },
        {
            memberName:'member2'
        },
        {
            memberName:'member3'
        }];

    $scope.addTeamMember=function(){


        $scope.allMembers.push({memberName:$scope.newMemberName});

    };
    $scope.removeTeamMember=function(members){
        $scope.myIndex=$scope.allMembers.indexOf(members);

        $scope.allMembers.splice($scope.myIndex,1);


    };

    $scope.createGroup=function(){
//alert($scope.groupName);

        $http.post('http://localhost:8000/api/addGroup',{groupName:$scope.groupName,groupData:$scope.groupDesc,userTitle: $rootScope.userName}).success(
            function(data){



                    $rootScope.allTeamData.push(data);
                    alert($rootScope.myCreatedTeam[0]);
                    console.log(data);




            }
        )
        $state.go('ionBarStripped.yourTeam');



    }




});
