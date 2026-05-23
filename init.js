let mongoose = require("mongoose");
let Chat = require("./models/chat.js");
async function main(params) {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatApp");
};
main()
.then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
});
Chat.insertMany([
    {
        from : "JK",
        to : "Pendu",
        message : "Saka laka Boom Boom",
        created_at : new Date(),
    },
    {
        from : "Jagan",
        to : "Ankit",
        message : "Hey Do You See My Result",
        created_at : new Date(),
    },
    {
        from : "Jk rath",
        to : "PP Rath",
        message :"Hello",
        created_at : new Date(),
    },
    {
        from : "Jk",
        to : "Prajna",
        message : "Hello My Name is Jk",
        created_at : new Date(),
    },
])
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
