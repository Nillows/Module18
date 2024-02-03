// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import necessary models and mongoose for database operations.
const { Thought, User, Reaction } = require("../models");
const mongoose = require("mongoose");

// Define a route to create a new thought.
router.post("/", (req, res) => {
    // Create a new user ID from the request body.
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    // Create a new thought using data from the request body.
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: userId
    }).then(newThought => {
        // Update the user's thoughts array with the new thought ID.
        return User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );
    }).then(dbUser => {
        if (!dbUser) {
            // If no user is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No user exists!" });
        } else {
            // Return a success message if the thought is created and user updated.
            res.json({ msg: "New thought created!" });
        }
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to get all thoughts.
router.get('/', (req, res) => {
    // Find all thoughts in the database and send them as a JSON response.
    Thought.find().then(dbThought => {
        res.json(dbThought);
    }).catch(err => {
        // Handle any errors that occur during the database query.
        console.error("Error fetching thoughts", err);
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to get a specific thought by its ID.
router.get('/:id', (req, res) => {
    // Find a thought by its ID in the database and send it as a JSON response.
    Thought.find({ _id: req.params.id }).then(dbThought => {
        if (!dbThought) {
            // If no thought is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No thought with that ID" });
        }
        res.json({ dbThought });
    }).catch(err => {
        // Handle any errors that occur during the database query.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to update a thought by its ID.
router.put("/:id", (req, res) => {
    // Find and update a thought by its ID in the database and send a response.
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(updatedThought => {
        if (!updatedThought) {
            // If no thought is found, return a 404 status with an error message.
            res.status(404).json({ msg: "No thought with that ID" });
        } else {
            // Return a success message if the thought is updated.
            res.json({ msg: "Thought updated!" });
        }
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to delete a thought by its ID.
router.delete("/:id", (req, res) => {
    // Find and delete a thought by its ID in the database and send a response.
    Thought.findOneAndDelete({ _id: req.params.id }).then(deletedThought => {
        res.json({ msg: "Thought deleted!" });
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to add a reaction to a thought.
router.post("/:thoughtId/reactions", (req, res) => {
    // Create a new reaction object from the request body.
    const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username
    };
    // Find and update the thought with the new reaction and send a response.
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction } },
        { new: true }
    ).then(newReaction => {
        res.json({ msg: "Reaction added!" });
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        console.error(err);
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Define a route to remove a reaction from a thought.
router.delete("/:thoughtId/reactions", (req, res) => {
    // Create a new reaction ID from the request body.
    const reactionId = new mongoose.Types.ObjectId(req.body.reactionId);
    // Find and remove the reaction from the thought and send a response.
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } }
    ).then(newReaction => {
        res.json({ msg: "Reaction removed!" });
    }).catch(err => {
        // Handle any errors that occur during the database operations.
        console.error(err);
        res.status(500).json({ msg: "Server error!", err });
    });
});

// Export the router containing all defined routes for use in the application.
module.exports = router;
