const express = require("express");
const passport = require("../auth/passport");
const CategoryJob = require("../model/categoryJob");
const router = express.Router();

//route qui recupere les categorie
router.get("/allCategory", passport, async (req, res) => {
    try {
        const cat = await CategoryJob.findAll({
            attributes: ["id", "name"],
        });
        return res.json(cat);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
