const express = require('express')
const multer = require('multer')
const router = express.Router()
const uploadFile = require('../service/storage.service')
const upload = multer({storage:multer.memoryStorage()})
const songModel = require('../models/Song.model')    

router.post('/songs' , upload.single("audio"),async (req , res)=>{
    console.log(req.body);
    const fileData = await uploadFile(req.file);
    console.log(fileData);  
    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })
    res.status(201).json({
        message:'Song created Successfully',
        song : song
    });
})

router.get('/songs', async (req, res) => {
    const { mood } = req.query;
    let songs;
    if (mood) {
        songs = await songModel.find({ mood: mood });
    } else {
        songs = await songModel.find({});
    }

    res.status(200).json({
        message: "Songs fetched Successfully",
        songs
    });
});



module.exports = router;
