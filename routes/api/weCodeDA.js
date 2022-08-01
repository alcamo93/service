const express = require('express'),
    router = require('express').Router(),
    { getProperties } = require('../../controllers/properties');

    
router.post('/properties', getProperties);

module.exports = router;