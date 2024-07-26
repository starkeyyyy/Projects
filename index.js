const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json')
const app = express();
const mongoose = require('mongoose');
const { timeStamp } = require('console');
const PORT = 9000;

//connection
mongoose
.connect("mongodb://127.0.0.1:27017/nodejs")
.then(() => console.log("mongo db Connected"))
.catch((err) => console.log("Mongo ERROR" , err));

//schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName: {
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    
},{timestamps:true})


 const user = mongoose.model("user" , userSchema);
 
//middlewares
app.use(express.urlencoded({extended: false}));
app.use((req,res,next) => {
    console.log('helow from m1');
    req.name = 'tanishq';
    next();
})

app.use((req,res,next) => {
    console.log('helow from m2', req.name);
    next();
})

//Routes

// for delete findByIdAndDelete( req.params.id , { jo bhi delete krna hai wo})
// for patch findByIdAndDelete( req.params.id , { jo bhi change krna hai wo})

app.route('/api/users/:id')
.get( async(req, res) => {
    const USER = await user.findById(req.params.id);
    const id = Number(req.params.id);
    
    return res.json(USER)
})
.patch( (req, res) => {
    return res.json({ status: "pending"})
})
.delete( (req, res) => {
    return res.json({ status: "pending"})
})


app.get('/api/users', async(req, res) => {
    const dbUsers = await user.find({});
    const dbfirstname = dbUsers.map((user) => user.firstName)
    res.json(dbfirstname);
})

app.post('/api/users', async(req, res) => {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.ip 
    )
    {return resizeTo.status(400).json({msg: "All fields are req..."})}
    const result = await user.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        ip: body.ip
    });
    console.log(result)

    return res.status(201).json({ msg: 'success'});
})




app.get('/users' , (req , res) => {
    const html = `<ul>${users.map((user) => `<li>${user.first_name}</li>`).join('')}</ul>`;
    return res.send(html);
})





app.listen(PORT , () => console.log('server started'))
