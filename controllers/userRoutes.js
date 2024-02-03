// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import the User model for database operations.
const { User } = require("../models");

// Define a route to get all users.
router.get('/', (req, res) => {
    // Find all users in the database and send them as a JSON response.
    User.find().then(dbUser => {
        res.json(dbUser);
    }).catch(err => {
        // Handle any errors that occur during the database query.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to get a specific user by their ID.
router.get('/:id', (req, res) => {
    // Find a user by their ID in the database and send their information as a JSON response.
    User.find({ _id: req.params.id }).then(dbUser => {
        if (!dbUser) {
            // If no user is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No user with that ID" });
        }
        res.json({
            dbUser,
            thoughts: dbUser.thoughts,
            friends: dbUser.friends
        });
    }).catch(err => {
        // Handle any errors that occur during the database query.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to create a new user.
router.post("/", (req, res) => {
    // Create a new user using data from the request body.
    User.create({
        username: req.body.username,
        email: req.body.email
    }).then(newUser => {
        // Send a success message if the user is created.
        res.json({ msg: "New user created!" });
    }).catch(err => {
        // Handle any errors that occur during user creation.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to update a user by their ID.
router.put("/:id", (req, res) => {
    // Find and update a user by their ID in the database and send a response.
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    ).then(updatedUser => {
        if (!updatedUser) {
            // If no user is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No user with that ID" });
        } else {
            // Return a success message if the user is updated.
            res.json({ msg: "User updated!" });
        }
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to delete a user by their ID.
router.delete("/:id", (req, res) => {
    // Find and delete a user by their ID in the database and send a response.
    User.findOneAndDelete({ _id: req.params.id }).then(deletedUser => {
        res.json({ msg: "User deleted!" });
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to add a friend to a user.
router.post('/:userId/friends/:friendId', (req, res) => {
    // Add a friend's ID to the user's friends array and send a response.
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } }
    ).then(dbUser => {
        if (!dbUser) {
            // If no user is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No user with that ID" });
        } else {
            // Return a success message if the friend is added.
            res.json({ msg: "Friend added!" });
        }
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to remove a friend from a user.
router.delete('/:userId/friends/:friendId', (req, res) => {
    // Remove a friend's ID from the user's friends array and send a response.
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
    ).then(dbUser => {
        if (!dbUser) {
            // If no user is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No user with that ID" });
        } else {
            // Return a success message if the friend is removed.
            res.json({ msg: "Friend removed!" });
        }
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Export the router containing all defined routes for use in the application.
module.exports = router;
