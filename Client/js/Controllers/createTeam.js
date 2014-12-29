
myApp.controller('createTeam',function($scope){
    $scope.newMemberName="";

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





});
