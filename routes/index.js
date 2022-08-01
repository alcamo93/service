const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ title: 'Funciones generales y con smart contract, sin frameworks' });
});

module.exports = router;
