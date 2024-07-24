const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json')
const app = express();
const PORT = 9000;
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

app.route('/api/users/:id')
.get( (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)
})
.patch( (req, res) => {
    return res.json({ status: "pending"})
})
.delete( (req, res) => {
    return res.json({ status: "pending"})
})


app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ id: users.length +1,...body});
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err, data) => {
        return res.json({status: 'pending'});
    }) 
})




app.get('/users' , (req , res) => {
    const html = `<ul>${users.map((user) => `<li>${user.first_name}</li>`).join('')}</ul>`;
    return res.send(html);
})





app.listen(PORT , () => console.log('server started'))
