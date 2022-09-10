const express = require("express");
const CategoryJob = require("../model/categoryJob");
const router = express.Router();

//route qui recupere les categorie
router.get("/allCategory", async (req, res) => {
    try {
        const cat = await CategoryJob.findAll({
            attributes: ["id", "name"],
        });
        return res.json(cat);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports = router;
