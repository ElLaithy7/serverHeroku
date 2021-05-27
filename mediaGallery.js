const express = require ("express")
const router = express.Router()
const media = require("./media")
router.get("/", async(req, res) => {
    try {
        const medias = await media.find();
        res.json({data: medias})
    } catch(err) {
        res.json({message: err});
}
})
router.post("/", async(req, res) => {
    try {
        const savedPost = await media.create(req.body); 
        res.json(savedPost);
    } catch(err) {
      res.json({message: err});
    }
})

router.get("/:_id",  async (req, res) => {
    try {
        const thisMedia = await media.findById(req.params._id)
        res.send(thisMedia)
    }
    catch (err) {
        res.send(err)
    }
})
module.exports = router
