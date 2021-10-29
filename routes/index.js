// Require express router
const router = require('express').Router();


// Import all of the API routes 
const userRoutes = require('./user-routes');

// Import all of the API routes 
const thoughtRoutes = require('./thought-routes');

// add prefix of `/api` to all of the api routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Module exports router
module.exports = router;