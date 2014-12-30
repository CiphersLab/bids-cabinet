var mongoose=require('mongoose');
var User=mongoose.model('User');
var Groups=mongoose.model('Groups');





module.exports.addUser=function(req,res){

    var userData=req.body;
    var allGroupsData=[];
    Groups.find(function(err,data){
        if(err)
            res.send(err)
        else
            allGroupsData.push(data);

    })

    User.findOne({fb_title:userData.userName},function(err,data){

        if(err){
            res.send(err)
        }
        else{
            if(data==null){
                var user_info=new User({
                    fb_id:userData.userId,
                    fb_title:userData.userName
                });
                user_info.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                    res.send(allGroupsData);
                });

            }
            else{
                res.send(allGroupsData[0]);
            }
        }


    })
};


module.exports.addGroup=function(req,res){

    var group_info=req.body;
    Groups.findOne({groupTitle:group_info.groupName},function(err,data){
        if(err){
            res.send(err)
        }
        else
        {
            if(data==null){
                var groupEntry=new Groups({
                    groupTitle:group_info.groupName,
                    groupDescription:group_info.groupData,
                    groupOwner:group_info.userTitle

                });
                groupEntry.save(function(err,data){
                    if(err)
                        res.send(err)
                    else
                    {
                        res.send(data)
                    }
                })
            }
            else{
                res.send(false);
            }
        }
    })
};

module.exports.joinGroup=function(req,res){
    var group_info=req.body;
    Groups.update({groupTitle:req.body.groupName},{$push:{'groupMembers':req.body.userName}},false,true);
    Groups.findOne({groupTitle:req.body.groupName},function(err,data){
        if(err)
        res.send(err);
        else
        {
            res.send(data.groupMembers)
        }
    })

};