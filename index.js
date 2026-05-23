let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
let mongoose = require("mongoose");
let Chat = require("./models/chat.js");
const methodOverride = require("method-override");
//for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//for serving static file
app.use(express.static(path.join(__dirname,"public")));
//for post request
app.use(express.urlencoded({extended : true}));
app.use(express.json());
//for method override
app.use(methodOverride("_method"));
//main func
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatApp");
};
//use
main()
.then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
});
// let chat1 = new Chat ({
//     from : "Jaga",
//     to: "Anki",
//     message : "Kouthi Achu bee..",
//     created_at : new Date()
// });
// chat1.save()
// .then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// });
app.listen(port,()=>{
    console.log("Mo Bhai Sunuchi Re");
});
//bulk Insertion
// Chat.insertMany([
//     {
//         from : "Windows",
//         to : "Linux",
//         message : "Hacker Bhai",
//         created_at : new Date()
//     },
//     {
//         from : "Pendu",
//         to : "Gudu",
//         message : "Buna",
//         created_at : new Date()
//     },
//     {
//         from : "Jaga",
//         to : "Gudu",
//         message : "Dengu MahaRaaj",
//         created_at :new Date()
//     },
//     {
//         from : "Dhara Madam",
//         to : "Babu Mia",
//         message : "Sibaprasad Kouthi...",
//         created_at : new Date()
//     },
//     {
//         from : "Babu Mia",
//         to : "Dhara Madam",
//         message : "Khandagiri reee..",
//         created_at : new Date()
//     },
// ]);
//show all chats
app.get("/chats",async(req,res)=>{
    let Chats = await Chat.find();
    res.render("index.ejs",{Chats});
});
//create a form
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//rendered the form
app.post("/chats",(req,res)=>{
    let {from,to,message} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : message, 
        created_at : new Date()
    });
    newChat
    .save()
    .then(()=>{
        console.log("Saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});
//edit Route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat =  await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs",{chat});
});
//update edit route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {message : Newmessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: Newmessage },
    {
        new: true,
        runValidators: true
    }
);
    
    res.redirect("/chats");
});
//Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});