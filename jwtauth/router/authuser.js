

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); 
const secret = "Shaik122"; 
const Profile = require('../model/Profile'); 


  
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Invalid username or password");
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});


router.post('/sign', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).send("Username already taken");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).send("User created successfully");

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

// Ensure this path is correct

// Create a new profile
router.post('/profile', async (req, res) => {
    const { Name, Age, Phoneno } = req.body;

    try {
        if (!Name || !Age || !Phoneno) {
            return res.status(400).send('All fields are required');
        }

        const newProfile = new Profile({
            Name,
            Age,
            Phoneno
        });

        await newProfile.save();

        return res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});


router.put('/profile/:id', async (req, res) => {
    const profileId = req.params.id;
    const { Name, Age, Phoneno } = req.body;

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            { Name, Age, Phoneno },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).send('Profile not found');
        }

        return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

router.get('/profile', async (req, res) => {
    try {
        const profiles = await Profile.find(); // Fetch all profiles
        return res.status(200).json(profiles);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});
router.delete('/profile/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findByIdAndDelete(id);
  
      if (!profile) {
        return res.status(404).send("Profile not found");
      }
  
      return res.status(200).send("Profile deleted successfully");
    } catch (error) {
      return res.status(500).send("Error deleting profile");
    }
  });
  router.all('*',()=>{
    console.log("end point error")
  })

module.exports = router;

