require('dotenv').config();
const express = require('express');
const path = require('path');

const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const workspaceRoutes = require('./routes/workspaceRoute');

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
app.use('/api/workspace', workspaceRoutes)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
