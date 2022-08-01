const express = require('express');
const router = express.Router(); // eslint-disable-line

const ethereumNode = require('../controller/ethereumNode');

router.get('/last-block', async (req, res) => {
  const data = await ethereumNode.getTransactions();
  return res.json(data);
});

router.get('/get-activos', async (req, res) => {
  const data = await ethereumNode.getActivos(req.body);
  return res.json(data);
});

router.post('/perform', async (req, res) => {
  try {
    const data = await ethereumNode.sendMoney(req.body);
    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
});

module.exports = router;
