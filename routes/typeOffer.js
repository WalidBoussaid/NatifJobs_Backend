const express = require("express");
const TypeOffer = require("../model/typeOffer");
const router = express.Router();

//route qui recupere les categorie
router.get("/allTypeOffer", async (req, res) => {
    try {
        const type = await TypeOffer.findAll({
            attributes: ["id", "name"],
        });
        return res.json(type);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports = router;
