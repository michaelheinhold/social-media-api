const apiRoutes = require('./api');
const router = require('express').Router();

router.use('/api', apiRoutes);

module.exports = router;
