const express = require("express");
const Rgpd = require("../model/rgpd");
const router = express.Router();
const passport = require("../auth/passport");

//route qui retourne le text du rgpd
router.get("/", async (req, res) => {
    try {
        const rgpd = await Rgpd.findAll();

        return res.json(rgpd);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui update le text du rgpd
router.post("/updateRgpd", passport, async (req, res) => {
    try {
        const text = req.body.text;

        const rgpd = await Rgpd.findOne({
            where: {
                id: 1,
            },
        });

        await rgpd.set({
            text: text,
        });

        await rgpd.save();

        return res.json(rgpd);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
