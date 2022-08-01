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

const contractFWCT = require('../routes/contractFracFWCT');
const WeCoinFWCT = new web3.eth.Contract(contractFWCT.contractABI, contractFWCT.contractAddress);

const contractAddress = contract.contractAddress;
const contractAbi = contract.contractABI;

async function activos(assetId, walletAddress) {
    // Leer mapeo asocia FWCT ERC721 Fraccional con WCT ERC20 Fraciones
    const reasset = [];
    await WeCoinRes4.methods.FWCT(assetId).call().then(async (dirtoken)=>{
        //console.log(dirtoken)

        const addrFWCT = dirtoken.fractionalToken
        //console.log(addrFWCT)
        const contFWCT = new web3.eth.Contract(contractFWCT.contractABI, addrFWCT);

        //console.log(contFWCT)

        //let result = await contFWCT.methods.balanceOf(wallet).call();
        await contFWCT.methods.balanceOf(walletAddress).call().then(async (balanceToken)=>{
        //console.log(balanceToken)
        const formattedResult = await web3.utils.fromWei(balanceToken, "ether");
        //console.log(formattedResult)

        reasset.push({
            id: assetId,
            contractWCT: addrFWCT,
            walletAddress: walletAddress,
            balanceWCT:formattedResult,
        });
        console.log(reasset)
        return await JSON.stringify(reasset)
        //return web3.utils.fromWei(balanceToken, "ether");
        })
    })
return reasset
}
//export.default = activos

module.exports.activos = activos;