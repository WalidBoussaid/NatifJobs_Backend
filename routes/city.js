const express = require("express");
const passport = require("../auth/passport");
const City = require("../model/city");
const router = express.Router();

//route qui recupere les villes
router.get("/allCity", async (req, res) => {
    try {
        const city = await City.findAll({
            attributes: ["id", "name"],
            order: [["createdAt", "DESC"]],
        });
        return res.json(city);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui ajoute une ville coté admin
router.post("/addCity", passport, async (req, res) => {
    try {
        const cityName = req.body.cityName;

        const cityexist = await City.findAll({
            where: {
                name: cityName,
            },
        });

        if (cityexist == null || cityexist == "") {
            const city = await City.create({
                name: cityName,
            });
            return res.json(city);
        } else {
            return res.status(404).json({ err: "La ville existe déjà !" });
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime une ville
router.delete("/deleteCity", passport, async (req, res) => {
    try {
        const cityId = req.body.cityId;

        const city = await City.findOne({
            where: {
                id: cityId,
            },
        });

        if (city) {
            await city.destroy();
        } else {
            return res.status(404).json({ err: "La ville n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
