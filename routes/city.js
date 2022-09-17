const express = require("express");
const passport = require("../auth/passport");
const City = require("../model/city");
const router = express.Router();

//route qui recupere les villes
router.get("/allCity", async (req, res) => {
    try {
        const city = await City.findAll({
            attributes: ["id", "name"],
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
        const city = City.create({
            name: cityName,
        });
        return res.json(city);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
