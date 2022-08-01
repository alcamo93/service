const Web3 = require('web3');

const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');
require('dotenv').config();

const API_URL = process.env.PROVIDER;
const PUBLIC_KEY = process.env.ADDRESS1;
const PRIVATE_KEY = process.env.ADDRESS1_KEY;

var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
//console.log(web3.utils)
const express = require('express');
const router = express.Router();

const contract = require('../routes/contractFrac');
const WeCoinRes4 = new web3.eth.Contract(contract.contractABI, contract.contractAddress);

const contractFWCT = require('../routes/contractFracFWCT');
const WeCoinFWCT = new web3.eth.Contract(contractFWCT.contractABI, contractFWCT.contractAddress);

const contractAddress = contractFWCT.contractFWCTAddress;
const contractAbi = contract.contractABI;

async function activos(proFrac, activoId, spender, amount) {
    // Leer mapeo asocia FWCT ERC721 Fraccional con WCT ERC20 Fraciones
    const reasset = [];
    console.log(activoId)
    await WeCoinRes4.methods.FWCT(activoId).call().then(async (dirtoken)=>{

        const addrFWCT = dirtoken.fractionalToken
        //console.log(addrFWCT)
        //console.log(receiver)
        const contFWCT = new web3.eth.Contract(contractFWCT.contractABI, addrFWCT);
        //console.log(contFWCT)

        return await signTransaction(proFrac, spender, amount, addrFWCT, contFWCT);
    });

    async function signTransaction(proFrac, spender, amount, addrFWCT, contFWCT) {

        //console.log(nonce)
        //console.log(contFWCT)
        //const gasEstimate = await contFWCT.methods.transfer(receiver, value).estimateGas(encodeABI());
        //console.log(gasEstimate);
        //'gas': gasEstimate,
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
        const value = web3.utils.toWei(amount, 'ether');

         const tx = {
          'from': proFrac,
          'to': PUBLIC_KEY,
          'nonce': nonce,
          'gas': 4800000,
          'data': contFWCT.methods.approve(spender, value).encodeABI()
        };

        // Sign the transaction
        //step 4: Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
        JSON.stringify(transactionReceipt);

        reasset.push({
            Id: activoId,
            from: PUBLIC_KEY,
            Contract: addrFWCT,
            to: receiver,
            amount: amount,
            transactionReceipt:transactionReceipt
        });
        console.log(reasset)
        return await JSON.stringify(reasset);
    }
    return reasset
}
module.exports.activos = activos