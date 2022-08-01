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

const contract = require('./contract');
const WeCoinRes4 = new web3.eth.Contract(contract.contractABI, contract.contractAddress);
const contractAddress = contract.contractAddress;

class EthereumNodeRe {
    constructor (provider) {
      this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3fd7c8337c8142f8b3c6b0c0dfa1c565'));
    }
    async obtenerActivos() {
    var cuantosActivos = await WeCoinRes4.methods.getAssetsSize().call();
    const reasset = [];
    for(var i=0;i<cuantosActivos;i++){

        WeCoinRes4.methods.assetMap(i)
        .call()
        .then((r)=>{
        //console.log(r)
        WeCoinRes4.methods.ownerOf(r.assetId).call().then((result)=>{
            //console.log(result)
            WeCoinRes4.methods.assetApprovals(r.assetId).call().then((res)=>{
            //console.log(res)
            if(res==0){
                res='None'
            }
                // Creación de arreglo con lo leido en la BC
                // Creación de JSON en el arreglo
                reasset.push({
                id: r.assetId,
                precio: r.price,
                propietario: result,
                aprobado: res,
                });
            })
            console.log(JSON.stringify(reasset));
            })
        })
    }
}

module.exports = new EthereumNodeRe(process.env.PROVIDER);