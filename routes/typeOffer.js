const express = require("express");
const passport = require("../auth/passport");
const TypeOffer = require("../model/typeOffer");
const router = express.Router();

//route qui recupere les categorie
router.get("/allTypeOffer", passport, async (req, res) => {
    try {
        const type = await TypeOffer.findAll({
            attributes: ["id", "name"],
        });
        return res.json(type);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

//route qui cree un type d'offre coté admin
router.post("/addTypeOffer", passport, async (req, res) => {
    try {
        const typeOfferName = req.body.typeOfferName;
        const type = City.create({
            name: typeOfferName,
        });
        return res.json(type);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
