const account1 = require("./hidden.json").account1;
const Web3 = require('web3'); // version 1.0.0-beta.35
const Filestorage = require('@skalenetwork/filestorage.js');

async function downloadFileToDesktop(storagePath){
  //create web3 connection

  const web3Provider = new Web3.providers.HttpProvider(
        account1.skaleEndpoint
    );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  let account = account1.accountAddress;


  console.log("about to download ", storagePath)

  let files = await filestorage.downloadToBuffer(storagePath);

  return files
}

var fileName = "SKALEtestfile8.txt";
var storagepath = account1.accountAddress.substring(2) + "/" + fileName;
resultpromise = downloadFileToDesktop(storagepath);
resultpromise.then(function(result) {
      console.log('Result', result);
    });
resultpromise.catch(function(error) {
  console.log('Caught!', error);
});