const express = require("express")
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const app = express()
const mongoose = require("mongoose")
let gridfs = require('gridfs-stream');
let fs = require('fs');
const mediaGalleryRoute = require("./mediaGallery")
const devicesRoute = require("./devices")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000, () => { console.log("server running") })
app.get("/", (req, res) => { res.send("temp") })
const connect = mongoose.connect("mongodb+srv://user1:amrpass@cluster0.htmtv.mongodb.net/data?retryWrites=true&w=majority", { useNewUrlParser: true }, () => console.log("connected"))

gridfs.mongo = mongoose.mongo;

let connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {

    let gfs = gridfs(connection.db);

    // Upload a file from local file-system to MongoDB
    app.post('/api/file/upload', (req, res) => {
        try {
            let filename = req.body.filename;

            let writestream = gfs.createWriteStream({ filename: filename });
            fs.createReadStream(__dirname + "/uploads/" + filename).pipe(writestream);
            writestream.on('close', (file) => {
                res.send('Stored File: ' + file.filename);
            });
        }
        catch (err) {
            res.status(400).send('Error');
            return
        }
    });

    // Download a file from MongoDB - then save to local file-system
    app.get('/api/file/download', (req, res) => {
        // Check file exist on MongoDB
        try {
            let filename = req.query.filename;
            gfs.exist({ filename: filename }, (err, file) => {
                if (err || !file) {
                    res.status(404).send('File Not Found');
                    return
                }

                let readstream = gfs.createReadStream({ filename: filename });
                readstream.pipe(res);
            });

        }
        catch (err) {
            res.status(400).send('Error');
            return
        }
    });

    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

    app.get('/api/file/downloadCropped', (req, res) => {
        // Check file exist on MongoDB
        try {
            let filename = req.query.filename;
            let order = req.query.order;
            let row = req.query.row;
            let posInColumn = req.query.posInColumn;
            let posInRow = req.query.posInRow;
            let xVal = 0
            let yVal = 0;
            let isHost = req.query.isHost;
            let maxWidth = 1280;
            let maxHeight = 720;
            let width = 0;
            let height = 0;
            let c1 = 0;
            let c2 = 0;
            let posColumn = "";
            let posRow = "";
            let finalHeight = 0;
            let finalWidth = 0;
    
            height = maxHeight / row;
            width = maxWidth / order;
            
            
            c1 = posInRow.length;
            c2 = posInColumn.length;
            posColumn = posInColumn.slice(0, 1);
            posRow = posInRow.slice(0);
            yVal = height * parseInt(posRow) - height;
            xVal = width * parseInt(posColumn) - width;
            finalHeight = height * c1;
            finalWidth = width * c2; 
    
    
            gfs.exist({ filename: filename }, async (err, file) => {
                if (err || !file) {
                    res.status(404).send('File Not Found');
                    return
                }
                let readstream = gfs.createReadStream({ filename: filename });
                if(isHost === '1'){
                    filename = "host" + between(50,100) + filename;
                }
                ffmpeg.setFfmpegPath(ffmpegPath);
                // ffmpeg.setFfprobePath(ffprobePath);
                ffmpeg.ffprobe(readstream, function (err, metadata) {
                    if (err) {
                        console.error(err);
                    } else {
                        // metadata should contain 'width', 'height' and 'display_aspect_ratio'
                        console.log(metadata);
                    }
                });
                let command = await ffmpeg(readstream)
                    .videoFilters([
                        {
                            filter: "crop",
                            options: {
                                w: finalWidth,
                                h: finalHeight, // add correct dimensions here,
                                x: xVal,
                                y: yVal
                                // Add x and y coordinates for crop
                            },
                        },
                    ])
                    .output(filename).on('end', () => {
                        let readerStream = fs.createReadStream(filename);
                        readerStream.pipe(res);
                    }).run();
                    console.log(filename)
                
    
            });
    
        }
        catch (err) {
            res.status(400).send('Error');
            return
        }
    });
})

app.use("/mediaGallery", mediaGalleryRoute)
app.use("/devices", devicesRoute)
