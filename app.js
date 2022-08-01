const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const transactionsRouter = require('./routes/transactions');
const balanceRouter = require('./routes/balance');
const activoRouter = require('./routes/activos');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/transactions', transactionsRouter);
app.use('/balance', balanceRouter);
app.use('/activos', activoRouter);
app.use(cors())
//app.use('/WeCoinToken', WeCoinTokenRouter);

//app.use('/api', apiRouter);

app.get('/', function(req, res) {
    respuesta = {
        codigo: 200,
        mensaje: 'Bienvenido al API services finHACK-Wecode DigitalAssets'
    };
    res.send(respuesta);
});

app.listen(3021, () => {
    console.log("El servidor API Wecode DigitalAssets está inicializado en el puerto 3021");
});

module.exports = app;