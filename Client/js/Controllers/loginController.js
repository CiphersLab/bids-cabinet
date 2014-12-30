

myApp.controller('loginController',function($scope,$facebook,$state){

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
                $state.go('ionBarStripped.yourTeam')
            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }

    refresh();


});
