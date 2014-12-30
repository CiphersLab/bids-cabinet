
myApp.controller('createTeam',function($scope,$http,$rootScope){
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
            function(err,data){
                if(err)
                    console.log(err);
                else
                    console.log(data);

            }
        )

    }




});
