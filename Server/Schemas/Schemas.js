var mongoose=require('mongoose');
var groupSchema=mongoose.Schema({
    groupTitle:String,
    groupDescription:String,
    groupOwner:String,
    groupMembers:[String],
    groupProjects:[{projectName:String, projectUrl:String}],
    imageData:{imageName:String,imagePath:String}
});


var userSchema=mongoose.Schema({
    fb_id: String,
    fb_title:String,
    groups_joined:[String],
    groups_created:[String]
});

mongoose.model('Groups',groupSchema);
mongoose.model('User',userSchema);

