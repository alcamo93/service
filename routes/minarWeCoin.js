const Web3 = require('web3');

const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const fs = require('fs');
require('dotenv').config();

const API_URL = process.env.PROVIDER;
const PUBLIC_KEY = process.env.ADDRESS1;
const PRIVATE_KEY = process.env.ADDRESS1_KEY;

var web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
console.log(web3.utils)
const express = require('express');
const router = express.Router();

const contract = require('./contractwc');
const WeCoinRes4 = new web3.eth.Contract(contract.contractABI, contract.contractAddress);
//console.log(WeCoinRes4);
const contractAddress = contract.contractAddress;
console.log(contractAddress);
//console.log(WeCoinRes4.methods.issueToken("0x1D3bF2Bf979dE2BC9D2D00CC6246ad8Bc55ae292", 50));
//const contractAddress = '0x14525CeA3a63F0C7e3C45f6CB442655617BaEec1';
//issueToken
async function enviarToken(MiToken) {
    //console.log(MiToken[0] +"-"+ MiToken[1] );

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    console.log(nonce);
    //const value = this.web3.utils.toHex(this.web3.utils.toWei(2, 'ether'));
    //console.log(value);
    const gasEstimate = await WeCoinRes4.methods.issueToken('0x1D3bF2Bf979dE2BC9D2D00CC6246ad8Bc55ae292', 850000000000000).estimateGas();
    console.log(gasEstimate);

    //const value = this.web3.utils.toHex(this.web3.utils.toWei(amount, 'ether'));
    //const receiver = ADDRESS3
    //console.log(receiver);
    // Create the transaction
      const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': gasEstimate,
      'data': WeCoinRes4.methods.issueToken('0x1D3bF2Bf979dE2BC9D2D00CC6246ad8Bc55ae292', 950000000000000).encodeABI()
    };

    // Sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash, "\n Verifique Infura o Etherscan para ver estado de tu Tx!");
        } else {
          console.log("Algo salió mal al enviar su transacción:", err)
        }
      });
    }).catch((err) => {
      console.log("Promesa fallida:", err);
    });


}

async function main() {
    //const message = await WeCoinRes4.methods.fetchAllAssets().call();
    //console.log("The message is: " + message);
    var MiToken = [
      ['0x1D3bF2Bf979dE2BC9D2D00CC6246ad8Bc55ae292'],
      [2000000000]
    ]  
    await enviarToken(MiToken);
}

main();