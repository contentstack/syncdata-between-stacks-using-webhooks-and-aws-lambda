/**
 * Module Dependencies
 */
const express = require('express');

const router = express.Router();

// Below is the routes for both header & footer

router.get('*', require('./partials'));

module.exports = router;
