require('dotenv').config();
const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const connection = require('./config/database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3333;
const hostname = process.env.HOST_NAME;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

//test Connection
// simple query
// connection.query(
//     'select *from users u',
//     function (err, results, fields) {
//         console.log('>>>results= ', results); // results contains rows returned by server
//         // console.log('>>>fields= ', fields); // fields contains extra meta data about results, if available
//     }
// );

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
