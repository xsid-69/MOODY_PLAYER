const mongoose = require('mongoose');
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey :process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT,
});

function uploadFile(file){
    return new Promise((resolve , reject)=>{
       imagekit.upload({
        file:file.buffer,
        folder:"audio",
        fileName:new mongoose.Types.ObjectId().toString(),
       },(error , result )=>{
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
       })
    })
}

module.exports = uploadFile;