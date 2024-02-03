// Import necessary modules from 'mongoose' for defining schemas and models.
const { Schema, model } = require("mongoose");

// Define the schema for a user.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, // Username is required.
            unique: true,  // Username must be unique.
            trim: true     // Trim whitespace from username.
        },
        email: {
            type: String,
            required: true, // Email is required.
            unique: true,  // Email must be unique.
            // Use a regular expression to validate email format.
            match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought" // Reference to the Thought model for thoughts associated with the user.
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"    // Reference to the User model for user's friends.
            }
        ],
    },
    {
        toJSON: {
            getters: true // Enable getters for JSON representation.
        }
    }
);

// Create a Mongoose model named 'User' based on the 'userSchema'.
const User = model("User", userSchema);

// Export the 'User' model for use in other parts of the application.
module.exports = User;
