const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');

const User = require('../model/userSchema')
const Authenticate = require('../Middleware/authenticate')
router.use(bodyParser.json());
router.use(cookieParser());


/************ End points********************/

// Home Page
router.get('/', (req, res) => {
    res.send('hello')
})

// Register user
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(400).json({ error: 'Please fill all the Fields' })
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            res.status(422).json({ message: 'Email allready Registered' })
        }
        else if (password !== cpassword) {
            res.status(422).json({ message: 'Password do not match' })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword })
            // Pre save method for Hashing data
            await user.save()
            res.status(201).json({ message: 'User Registered Successfully' })
        }
    } catch (error) {
        console.log(error)
    }
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Generate Token for Authorization
        const token = await user.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
        });

        res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// About Page 
router.get('/about', Authenticate, (req, res) => {
    res.send(req.rootUser)
})

// Logout Page 
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User Logged out')
})

// ContactPage display data
router.get('/getdata', Authenticate, (req, res) => {
    res.send(req.rootUser)
}) 

// ContactPage sent Data
router.post('/contact', Authenticate, async (req, res) => {
    try {
        const { message } = req.body;
        
        if(!message){
            return res.status(400).json({ error: "Empty Message Field"});
        }

        const user = await User.findOne({_id:req.userID});
       
        if(user)
        {
            const userMessage= await user.sendMessage(message);
            await user.save()

            res.status(201).json({ message: "Message Sent"});
        }

    } 
    catch (error) {
        console.log(error)
    }
})



module.exports = router