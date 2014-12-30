

myApp.controller('loginController',function($scope,$facebook,$state,$http,$rootScope){
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
                $scope.isLoggedIn = true;
                $state.go('ionBarStripped.yourTeam');
                $http.post('http://localhost:8000/api/addUser',{userName:response.name,userId:response.email}).success(
                    function(err,data){
                        if(err)
                            console.log(err);
                        else{

                            console.log(data)
                        }
                        $rootScope.userName=response.name;

                    }
                )
            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }

    refresh();


});
