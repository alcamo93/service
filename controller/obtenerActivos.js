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

const contract = require('../routes/contract');
const WeCoinRes4 = new web3.eth.Contract(contract.contractABI, contract.contractAddress);
const contractAddress = contract.contractAddress;

async function activos() {
  var cuantosActivos = await WeCoinRes4.methods.getAssetsSize().call();
  const reasset = [];
  for(var i=0;i<cuantosActivos;i++){
    await WeCoinRes4.methods.assetMap(i)
    .call()
    .then(async (r)=>{
      //console.log(r)
     await WeCoinRes4.methods.ownerOf(r.assetId).call().then(async (result)=>{
        //console.log(result)
        await WeCoinRes4.methods.assetApprovals(r.assetId).call().then(async (res)=>{
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
            // console.log(reasset)
            return await JSON.stringify(reasset)
          })
        })
      })
    }
    // console.log(reasset);
  return reasset
}

/* async function main() {
    await activos();
}

main(); */
//export.default = activos
module.exports.activos = activos;