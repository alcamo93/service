const express = require('express');
const router = express.Router();

const agregarActivos = require('../controller/agregaActivo');

router.post('/agregarActivos', async (req, res) => {
    // try {
    let price = req.body.price
    let address = req.body.address
    let agregado = await agregarActivos.agregarActivo(price,address)
    console.log(agregado)
    return res.json(agregado);
    // } catch (error){
      // return res.json({ error });
    // }
});

const agregarActivosFrac = require('../controller/agregaActivoFrac');

router.post('/agregarActivosFrac', async (req, res) => {
    // try {
    let price = req.body.price
    let frac = req.body.frac
    let tiempo = req.body.tiempo
    let area = req.body.area
    let aconst = req.body.aconst
    let tokenCDI = req.body.tokenCDI
    let tokenCDI1 = req.body.tokenCDI1
    let address = req.body.address
    let agregado = await agregarActivosFrac.agregarActivoFrac(price,frac,tiempo,area,aconst,tokenCDI,tokenCDI1,address)
    console.log(agregado)
    return res.json(agregado);
    // } catch (error){
      // return res.json({ error });
    // }
});

const obtenerActivo = require('../controller/obtenerActivos');

router.get('/activos', async (req, res) => {
try {
  const data = await obtenerActivo.activos();
  console.log(data);
  return res.json(data);
} catch (error) {
  return res.json({ error });
}
});

const obtenerActivoFrac = require('../controller/obtenerActivosFrac');

router.get('/activosFrac', async (req, res) => {
try {
  const data = await obtenerActivoFrac.activos();
  console.log(data);
  return res.json(data);
} catch (error) {
  return res.json({ error });
}
});

const obtenerActivoFracFWCT = require('../controller/obtenerActivosFracFWCT');

router.get('/activosFracFWCT', async (req, res) => {
try {
  const data = await obtenerActivoFracFWCT.activos();
  console.log(data);
  return res.json(data);
} catch (error) {
  return res.json({ error });
}
});


const balanceTk = require('../controller/balanceWCT');

router.get('/balanceWCT', async (req, res) => {
  try {
    let assetId = req.body.assetId
    let address = req.body.address
    const data = await balanceTk.activos(assetId, address);
    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
});


const enviarTWCT = require('../controller/enviarWCT');

router.post('/enviarWCT', async (req, res) => {
    // try {
    let activoId = req.body.activoId
    let receiver = req.body.receiver
    let amount = req.body.amount
    let envioTwct = await enviarTWCT.activos(activoId, receiver, amount)
    console.log(envioTwct)
    return res.json(envioTwct);
    // } catch (error){
      // return res.json({ error });
    // }
});

const impReclamo = require('../controller/implementaReclamo');

router.post('/implementaReclamo', async (req, res) => {
    // try {
    let dirFrac = req.body.dirFrac
    let activoId  = req.body.activoId
    let impRec = await impReclamo.activos(dirFrac, activoId)
    console.log(impRec)
    return res.json(impRec);
    // } catch (error){
      // return res.json({ error });
    // }
});

const fonReclamo = require('../controller/fondeaReclamo');

router.post('/fondeaReclamo', async (req, res) => {
    // try {
    let dirReclamo = req.body.dirReclamo
    let dirWCT = req.body.dirWCT
    let amount  = req.body.amount
    let fonRec = await fonReclamo.activos(dirReclamo, dirWCT, amount)
    console.log(fonRec)
    return res.json(fonRec);
    // } catch (error){
      // return res.json({ error });
    // }
});

module.exports = router;