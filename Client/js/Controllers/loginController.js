

myApp.controller('loginController',function($scope,$state,$http,$rootScope,$facebook){



    $rootScope.allGroups=[];
    $rootScope.allTeamData=[];

    $rootScope.yourCreatedTeam=[];

    $rootScope.userName='';



    //For Web Facebook Login

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
                            localStorage.browserUserName=response.name;
                            $state.go('ionBarStripped.yourTeam');
                        }

                        else{

                            console.log(data);
                            $rootScope.userName=response.name;
                            localStorage.browserUserName=response.name;
                            $state.go('ionBarStripped.yourTeam');
                        }




                    }
                )
                    .error(function(data){
                        $rootScope.userName=response.name;
                        localStorage.browserUserName=response.name;
                        $state.go('ionBarStripped.yourTeam');
                    });



            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }

    refresh();


});
