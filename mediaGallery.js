const express = require ("express")
const router = express.Router()
const media = require("./media")
router.get("/", async(req, res) => {
    try {
        //media.find() was here
        const medias = await media.find();
        res.json({data: medias})
    } catch(err) {
        res.json({message: err});
}
})
router.post("/", async(req, res) => {
    // const post = new media(
    //     {title: req.body.title,
    //      type: req.body.type, 
    //      url: req.body.url});

    try {
        //post.save() was here
        const savedPost = await media.create(req.body); 
        res.json(savedPost);
    } catch(err) {
      res.json({message: err});
    }
         
  
})
module.exports = router
