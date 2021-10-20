
  //JavaScript function for handling the file upload 
  //create web3 connection
  // npm install @skalenetwork/filestorage.js@~0.2.x

const account1 = require("./hidden.json").account1;
const Web3 = require('web3');
const Filestorage = require('@skalenetwork/filestorage.js');

const { readFile } = require('fs/promises');
const path = require("path");

async function uploadFile(originPath, targetPath){
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
      account1.skaleEndpoint
  );
  console.log("web3provider")
  let web3 = new Web3(web3Provider);
  console.log("web3")


  //get filestorage instance
  let filestorage = new Filestorage(web3, true);
  // let filestorage = new Filestorage(web3Provider, true);
  console.log("filestorage")

  let account = account1.accountAddress;

  const filePath = targetPath;

  fs = require('fs')
  const data = await new Promise((res, rej)=>{
    fs.readFile('SKALEtestfile.txt', 'utf8', function (err, data) {
      if(err) return rej(err);
      res(data)
    });
  })

  bytes = Buffer.from(data, 'utf8');
  //var fileBuffer = await readFile(originPath);
  //console.log("readFile", fileBuffer.length);

  //const bytes = new Uint8Array(fileBuffer.buffer);

  let privateKey = account1.privateKey;
  // let reservespace = filestorage.getReservedSpace(account);
  // let reservespace = filestorage.getOccupiedSpace(account);
  // let reservespace = filestorage.getTotalSpace(account);
  // let reservespace = filestorage.getTotalReservedSpace();

  let reservespace = '1000'; // bytes.length.toString();

  console.log ('Reservespace', reservespace);
  let reserve = await filestorage.reserveSpace(account, account, reservespace, privateKey);
      console.log('Reserve', reserve);

  let linkpromise = await filestorage.uploadFile(
    account, 
    filePath, 
    bytes,
    privateKey
  );

  console.log("uploadFile", linkpromise)

  return linkpromise


}

uploadFile(
  path.join(__dirname + "/SKALEtestfile.txt"),
  "SKALEtestfile9.txt"
)
