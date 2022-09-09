const express = require("express");
const { Offer, Employer, CategoryJob, TypeOffer } = require("../model/schema");
const router = express.Router();
const passport = require("../auth/passport");

router.post("/addOffer", passport, async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const categoryOffer = req.body.categoryOffer;
        const typeOffer = req.body.typeOffer;

        const userId = req.user.userId;

        const employer = await Employer.findOne({
            where: {
                id: userId,
            },
        });

        const category = await CategoryJob.findOne({
            where: {
                id: categoryOffer,
            },
        });

        const type = await TypeOffer.findOne({
            where: {
                id: typeOffer,
            },
        });

        if (employer == null || employer == "") {
            res.status(404).json({ err: "L'employeur n'esxiste pas !" });
        }
        if (category == null || category == "") {
            res.status(404).json({ err: "La categorie n'esxiste pas !" });
        }
        if (type == null || type == "") {
            res.status(404).json({ err: "Le type d'offre n'esxiste pas !" });
        }
        if (title.length < 4) {
            res.status(404).json({
                err: "Titre pas confomre (min 4 caractères)!",
            });
        }
        if (description.length < 10) {
            res.status(404).json({
                err: "Description pas confomre (min 10 caractères)!",
            });
        }

        const offer = await Offer.create({
            title: title,
            description: description,
        });

        await offer.setEmployer(employer);
        await offer.setCategoryJob(category);
        await offer.setTypeOffer(type);

        return res.json(offer);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports = router;
