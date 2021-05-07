const express = require ("express")
const app = express() 
const mongoose = require ("mongoose")
var gridfs = require('gridfs-stream');
var fs = require('fs');
const mediaGalleryRoute = require ("./mediaGallery")
const bodyParser = require ("body-parser")
app.use(bodyParser.json())
app.listen(3003,() => {console.log("server running")})
app.get("/",(req,res) => {res.send("temp")})

const connect = mongoose.connect("mongodb+srv://user1:amrpass@cluster0.htmtv.mongodb.net/data?retryWrites=true&w=majority", {useNewUrlParser: true}, () => console.log("connected"))

gridfs.mongo = mongoose.mongo;

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {

    var gfs = gridfs(connection.db);

    // Upload a file from local file-system to MongoDB
    app.post('/api/file/upload', (req, res) => {
		
		var filename = req.body.filename;
		
        var writestream = gfs.createWriteStream({ filename: filename });
        fs.createReadStream(__dirname + "/uploads/" + filename).pipe(writestream);
        writestream.on('close', (file) => {
            res.send('Stored File: ' + file.filename);
        });
    });

    // Download a file from MongoDB - then save to local file-system
    app.get('/api/file/download', (req, res) => {
        // Check file exist on MongoDB
		
		var filename = req.query.filename;
		
        gfs.exist({ filename: filename }, (err, file) => {
            if (err || !file) {
                res.status(404).send('File Not Found');
				return
            } 
			
			var readstream = gfs.createReadStream({ filename: filename });
			readstream.pipe(res);            
        });
    });

})
app.use("/mediaGallery", mediaGalleryRoute)

