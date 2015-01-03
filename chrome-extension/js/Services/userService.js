
myApp.factory('userService',function(){
    var data = {
        userId:null,
        allTeam:[],
        yourTeam:[]
    };


    /*Get and Set Methods For UserID*/

    var getUserId = function(){
        return data.userId;
    };

    var setUserId = function(id){
        data.userId = id;
    };

    /*Get and Set Methods For User Created Teams*/

    var getUserTeams = function(){
        return data.yourTeam;
    };

    var setUserTeams = function(createdTeam){
        data.yourTeam = createdTeam;
    };

     /*Get and Set Methods For All Teams*/

    var getAllTeams = function(){
        return data.allTeam;
    };

    var setAllTeams = function(allTeam){
        data.allTeam = allTeam;
    };

    return {
        getUserId:getUserId,
        setUserId:setUserId,
        getUserTeams:getUserTeams,
        setUserTeams:setUserTeams,
        getAllTeams:getAllTeams,
        setAllTeams:setAllTeams
    };


});