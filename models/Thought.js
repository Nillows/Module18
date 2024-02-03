// Import necessary modules from 'mongoose' for defining schemas and models.
const { Schema, model } = require("mongoose");

// Import the 'dayjs' library for date formatting.
const dayjs = require("dayjs");

// Import 'ObjectId' from 'bson' to create unique identifiers for reactions.
const { ObjectId } = require("bson");

// Define the schema for a reaction.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,

            // Set a default value for the unique reaction identifier.
            default: new ObjectId
        },
        reactionBody: {
            type: String,

            // Ensure the reaction body is required and has a maximum length of 280 characters.
            required: true,
            maxLength: 280
        },
        username: {
            type: String,

            // Ensure the username is required.
            required: true
        },
        createdAt: {
            type: String,

            // Set a default value for the creation date using 'dayjs'.
            default: dayjs(),
            // Define a custom 'get' function to format the date as "DD/MM/YYYY h:mm".
            get: (value) => dayjs(value).format("DD/MM/YYYY h:mm")
        }
    }
);

// Define the schema for a thought.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,

            // Ensure the thought text is required, has a minimum length of 1 character,
            // and a maximum length of 280 characters.
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,

            // Set a default value for the creation date using 'dayjs'.
            default: dayjs(),
            // Define a custom 'get' function to format the date as "DD/MM/YYYY h:mm".
            get: (value) => dayjs(value).format("DD/MM/YYYY h:mm")
        },
        username: {
            type: String,

            // Ensure the username is required.
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            // Enable getters and virtuals for JSON representation.
            getters: true,
            virtuals: true
        }
    }
);

// Create a Mongoose model named 'Thought' based on the 'thoughtSchema'.
const Thought = model("Thought", thoughtSchema);

// Export the 'Thought' model for use in other parts of the application.
module.exports = Thought;
