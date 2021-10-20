const account1 = require("./hidden.json").account1;
const Web3 = require('web3'); // version 1.0.0-beta.35
const Filestorage = require('@skalenetwork/filestorage.js');

async function deleteFile(filePath) {
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    account1.skaleEndpoint
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  let privateKey = account1.privateKey;
  let account = account1.accountAddress;

  // const fullPath = path.join(account.substring(2), filePath);

  console.log("before delete file")


  const result = await filestorage.deleteFile(account, filePath, privateKey);
  console.log("after delete file", result);

  return result
}
var storagepath = "SKALEtestfile9.txt";
resultpromise = deleteFile(storagepath);
resultpromise.then(function(result) {
      console.log('Result', result);
    });
resultpromise.catch(function(error) {
  console.log('Caught!', error);
});