const Web3 = require('web3');

const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');
require('dotenv').config();

const API_URL = process.env.PROVIDER;
const PUBLIC_KEY = process.env.ADDRESS1;
const PRIVATE_KEY = process.env.ADDRESS1_KEY;

var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));

const express = require('express');
const router = express.Router();

const contract = require('../routes/contractFrac');
const WeCoinRes4 = new web3.eth.Contract(contract.contractABI, contract.contractAddress);
// console.log(WeCoinRes4);
const contractAddress = contract.contractAddress;
// console.log(contractAddress);

async function agregarActivoFrac(price,frac,tiempo,area,aconst,tokenCDI,tokenCDI1,address) {
    //console.log(MiActivo[0] +"-"+ MiActivo[0] );
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    // let register = ""
    //const gasEstimate = await WeCoinRes4.methods.addAsset(12, '0x1D3bF2Bf979dE2BC9D2D00CC6246ad8Bc55ae292').estimateGas();
    //console.log(gasEstimate);

    // Create the transaction
     const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 4800000,
      'data': WeCoinRes4.methods.addAsset(price, frac, tiempo, area, aconst, tokenCDI,  tokenCDI1, address).encodeABI()
      // 'data': WeCoinRes4.methods.addAsset(14, '0x32a8c646CF434BC3a82A09Bf4Cde1Ff369f4c5C1').encodeABI()
    };

    // Sign the transaction
    const signPromise =  await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    console.log(signPromise)
    return await web3.eth.sendSignedTransaction(signPromise.rawTransaction)

    //     signPromise.then( (signedTx) => {
    //   // let register =  ""
    //   web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
    //     if (!err) {
    //       console.log("The hash of your transaction is: ", hash, "\n Check Infura o Etherscan to view the status of your transaction!");
    //     return hash
    //     } else {
    //       console.log("Something went wrong when submitting your transaction:", err)
    //     }
    //   }) 
    //   //  console.log(register)
    // }).catch((err) => {
    //   console.log("Promise failed:", err);
    // });


}

module.exports.agregarActivoFrac = agregarActivoFrac