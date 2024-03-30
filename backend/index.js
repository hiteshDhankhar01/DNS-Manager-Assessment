const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./Routes/UserRouter')
const Domain = require('./Routes/DomainRouter')
const env = require('dotenv').config()

const app = express();

// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/user', User)
app.use('/api/domain', Domain)


mongoose.connect('mongodb://127.0.0.1:27017/DNS', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server is running at http://127.0.0.1:${PORT}`));



// const express = require("express")

// const app = express()

// app.get('/', (req, res) => {
//     res.send("hellow")
// })

// app.listen(7000, () => console.log("Server run at http://127.0.0.1:7000/"))