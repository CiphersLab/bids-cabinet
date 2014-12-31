

myApp.controller('loginController',function($scope,$facebook,$state,$http,$rootScope){

    $rootScope.allGroups=[];
    $rootScope.allTeamData=[];

    $rootScope.yourCreatedTeam=[];

    $rootScope.userName='';
    $scope.login = function() {
        $facebook.login().then(function() {
            refresh();


        });
    };

    function refresh() {
        $facebook.api("/me").then(
            function(response) {
                $scope.welcomeMsg = "Welcome " + response.name;
                $rootScope.userName=response.name;
                $scope.isLoggedIn = true;

                $http.post('http://localhost:8000/api/addUser',{userName:response.name,userId:response.email}).success(
                    function(err,data){
                        if(err)
                        {
                            console.log(err);
                            $rootScope.userName=response.name;
                        }

                        else{

                            console.log(data);
                            $rootScope.userName=response.name;
                        }




                    }
                )
                    .error(function(data){
                        $rootScope.userName=response.name;
                    });

                $http.get('http://localhost:8000/api/findGroups')
                    .success(function(data){
                        alert('asdadsd');
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
                        $state.go('ionBarStripped.yourTeam');

                    }
                );
                /*  $state.go('ionBarStripped.yourTeam');*/
            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }

    refresh();


});
