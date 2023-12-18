const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const userRoute = require('./Routes/user.route')
let users = require('./Models/user.module')
const { v4: uuidv4 } = require('uuid')



const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Views/index.html");
});

// GET data from local server

app.get('/users', (req, res) => {
    res.status(200).json({ users })
});

// POST data from local server


app.post('/users', (req, res) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser)
    res.status(201).json(users)
});

// UPDATE data from local server

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    users.filter(user => user.id === id).map((selected) => {
        selected.name = name,
            selected.email = email
    })

    res.status(200).json(users);
});

// DELETE data from local server

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;


    users = users.filter(user => user.id !== id)
    res.status(200).json(users);
});




app.use((req, res, next) => {
    res.status(404).send("Sorry, the requested page doesn't exist.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
