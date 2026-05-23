let mongoose = require("mongoose");
let chatSchema = mongoose.Schema({
    from : {
        type :String,
        required : true
    },
    to : {
        type : String,
        required :true
    },
    message : {
        type : String,
        maxLength : 50
    },
    created_at : {
        type : String,
        require:true
    }
});
//create Model
const Chat = mongoose.model("Chat" ,chatSchema);
module.exports = Chat;