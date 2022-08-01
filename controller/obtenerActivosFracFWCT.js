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

async function activos() {
  var cuantosActivos = await WeCoinRes4.methods.getAssetsSize().call();
  //console.log(cuantosActivos)
  const reasset = [];
  for(var i=0;i<cuantosActivos;i++){
    await WeCoinRes4.methods.assetMap(i)
    .call()
    .then(async (r)=>{
     //console.log(r.assetId)
     await WeCoinRes4.methods.ownerOf(r.assetId).call().then(async (result)=>{
        await WeCoinRes4.methods.assetApprovals(r.assetId).call().then(async (res)=>{
          if(res==0){
            res='None'
          }
          // Leer mapeo asocia FWCT ERC721 Fraccional con WCT ERC20 Fraciones
          await WeCoinRes4.methods.FWCT(r.assetId).call().then(async (dirtoken)=>{
              //console.log(dirtoken)

              const addrFWCT = dirtoken.fractionalToken
              //console.log(addrFWCT)
              const contFWCT = new web3.eth.Contract(contractFWCT.contractABI, addrFWCT);

              //console.log(contFWCT)

              await contFWCT.methods.totalSupply().call().then(async (totaltoken)=>{

                  // Creación de arreglo con lo leido en la BC
                  // Creación de JSON en el arreglo
                  reasset.push({
                    id: r.assetId,
                    precio: r.price,
                    frac: r.frac,
                    tiempo: r.tiempo,
                    tokenURI: r.tokenCDI,
                    propietario: result,
                    aprobado: res,
                    dirToken: dirtoken,
                    totalToken: totaltoken,
                  });
                      console.log(reasset)
                      return await JSON.stringify(reasset)
              })
          })
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