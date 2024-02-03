// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import userRoutes module, which contains routes related to users,
// and mount these routes under the '/api/users' path.
const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

// Import thoughtRoutes module, which contains routes related to thoughts,
// and mount these routes under the '/api/thoughts' path.
const thoughtRoutes = require("./thoughtRoutes");
router.use("/api/thoughts", thoughtRoutes);

// Export the router, which now contains all the defined routes,
// to make it available for use in other parts of the application.
module.exports = router;