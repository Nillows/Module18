# E-Commerce Data Back End

## Description 
This project is a plug and play back end to create, read, update, and destroy information in an integrated MySQL database with pre-built routes to attach to your front end!

## [Video Link](https://streamable.com/9jo4n5)    

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation
1. Run `npm i` to install the dependent node packages.
2. Seed the new database by running `npm run seed` from the root folder in your Terminal.
3. Launch the App by running 'npm run server' from the root folder in your Terminal.

## Usage 
After launching the application, you have the capability to execute GET, POST, PUT, and DELETE requests to interact with the system. The following instructions provide the formats for making these requests to various parts of the application.

### User Routes
- **Get all users**: `GET http://localhost:3000/api/users`
- **Get a single user by ID**: `GET http://localhost:3000/api/users/:id` (Replace `:id` with the actual user ID)
- **Create a new user**: `POST http://localhost:3000/api/users`
  - **Body**:
    ```json
    {
      "username": "user123",
      "email": "user123@example.com"
    }
    ```
- **Update a user by ID**: `PUT http://localhost:3000/api/users/:id` (Replace `:id` with the actual user ID)
  - **Body**:
    ```json
    {
      "username": "updatedUser",
      "email": "updatedEmail@example.com"
    }
    ```
- **Delete a user by ID**: `DELETE http://localhost:3000/api/users/:id` (Replace `:id` with the actual user ID)

### Friend Routes
- **Add a friend**: `POST http://localhost:3000/api/users/:userId/friends/:friendId` (Replace `:userId` and `:friendId` with their respective IDs)
- **Remove a friend**: `DELETE http://localhost:3000/api/users/:userId/friends/:friendId` (Replace `:userId` and `:friendId` with their respective IDs)

### Thought Routes
- **Get all thoughts**: `GET http://localhost:3000/api/thoughts`
- **Get a single thought by ID**: `GET http://localhost:3000/api/thoughts/:id` (Replace `:id` with the actual thought ID)
- **Create a new thought**: `POST http://localhost:3000/api/thoughts`
  - **Body**:
    ```json
    {
      "thoughtText": "This is a thought.",
      "username": "user123",
      "userId": "userIdHere"
    }
    ```
- **Update a thought by ID**: `PUT http://localhost:3000/api/thoughts/:id` (Replace `:id` with the actual thought ID)
  - **Body**:
    ```json
    {
      "thoughtText": "Updated thought content."
    }
    ```
- **Delete a thought by ID**: `DELETE http://localhost:3000/api/thoughts/:id` (Replace `:id` with the actual thought ID)

### Reaction Routes
- **Add a reaction to a thought**: `POST http://localhost:3000/api/thoughts/:thoughtId/reactions`
  - **Body**:
    ```json
    {
      "reactionBody": "This is a reaction.",
      "username": "reactingUser"
    }
    ```
  - Replace `:thoughtId` with the actual thought ID.
- **Remove a reaction from a thought**: `DELETE http://localhost:3000/api/thoughts/:thoughtId/reactions/:reactionId`
  - **Body** (if your implementation requires it):
    ```json
    {
      "reactionId": "specificReactionId"
    }
    ```
  - Replace `:thoughtId` with the actual thought ID and `:reactionId` with the ID of the reaction to be removed.

## Credits
Nillows

## License
This project is covered under the MIT license.

## Features
1. View all users.
2. View all thoughts.
3. View single user.
4. View single thought.
5. Add new user.
6. Add new thought.
7. Add reaction to thought.
8. Add friend to user.
9. Update user.
10. Update thought.
11. Delete single user.
12. Delete single thought.
    
## How to Contribute.
Paypal

## Tests
N/A

## Questions
Find me on GitHub: [Nillows](https://github.com/Nillows)
Email me with any questions: thomwollin@gmail.com
