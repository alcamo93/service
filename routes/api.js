const router = require('express').Router(),
    weCodeDA = require('./api/weCodeDA');

router.use('/weCodeDA', weCodeDA);

module.exports = router;