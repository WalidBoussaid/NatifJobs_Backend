const express = require("express");
const passport = require("../auth/passport");
const TypeOffer = require("../model/typeOffer");
const router = express.Router();

//route qui recupere les type d'offre
router.get("/allTypeOffer", passport, async (req, res) => {
    try {
        const type = await TypeOffer.findAll({
            attributes: ["id", "name"],
            order: [["createdAt", "DESC"]],
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

        const typeExist = await TypeOffer.findAll({
            where: {
                name: typeOfferName,
            },
        });

        if (typeExist == null || typeExist == "") {
            const type = await TypeOffer.create({
                name: typeOfferName,
            });
            return res.json(type);
        } else {
            return res
                .status(404)
                .json({ err: "Le type d'offre existe déjà !" });
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime un type d'offre
router.delete("/deleteTypeOffer", passport, async (req, res) => {
    try {
        const typeId = req.body.typeId;

        const type = await TypeOffer.findOne({
            where: {
                id: typeId,
            },
        });

        if (type) {
            await type.destroy();
        } else {
            return res
                .status(404)
                .json({ err: "Le type d'offre n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
