
myApp.controller('createTeam',function($scope,$http,$rootScope,$state,base64){

    console.log('create team');

    $scope.userName=localStorage.browserUserName;
    $scope.memberName='';
    /* $rootScope.addedMembers=[];*/
    $scope.file = null;

    //Asad Coding Ends

    $scope.addedProjectsName='';
    $scope.addedProjectsUrl='';
    $scope.allUsers=[];

    $scope.imageModel="";

    $http.get('http://localhost:8000/api/getUsers')
        .success(function(data){


            $scope.allUsers=data;

            //Here logic is written to prevent owner name in the add Team User List in 'Create your Team Tab'

            for(var i=0;i<$scope.allUsers.length;i++)
            {
                if($scope.allUsers[i].fb_title==$scope.userName){

                    $scope.allUsers.splice(i,1);

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
    var getFileReader = function( $scope ) {

        var fileReader = new FileReader();

        fileReader.onloadend = function() {

            $scope.imageModel = fileReader.result;

        }

        return fileReader;
    };
    $scope.saveImage = function(flow){

        if(flow){
            var abc = !!{png:1,gif:1,jpg:1,jpeg:1}[flow.files[0].getExtension()]
            if(abc == true){

                var fileReader = getFileReader( $scope ),
                    file = flow.files[0].file;

                fileReader.readAsDataURL(file);

                $scope.$apply();

            }else{
                flow.cancel()
            }
        }
    };
    //  $scope.groupData = {userID:userData._id,title:'',description:'',picData:'',membersID:[],is_gps:true,is_fb:false,is_twit:false,is_private:false}
    /* $scope.groupName="";
     $scope.groupDesc="";*/

    $scope.createGroup=function(){


        $http.post('http://localhost:8000/api/addGroup',{
            groupName:$scope.groupName,
            groupData:$scope.groupDesc,
            userTitle: $scope.userName,
            addedMembers:$scope.addedMembers,
            groupProjectName:$scope.addedProjectsName,
            groupProjectUrl:$scope.addedProjectsUrl,
            imageData:$scope.imageModel
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

                                if($rootScope.allGroups[j].groupOwner==$scope.userName)
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
