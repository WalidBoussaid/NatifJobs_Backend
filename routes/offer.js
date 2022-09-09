const express = require("express");
const { Offer, Employer, CategoryJob, TypeOffer } = require("../model/schema");
const router = express.Router();
const passport = require("../auth/passport");
const { findByPk, findOne } = require("../model/candidate");

//route qui cree une offre
router.post("/addOffer", passport, async (req, res) => {
    //passport me permet de recuprer via req.user.userId l'id de l'employeur connecté
    try {
        const title = req.body.title;
        const description = req.body.description;
        const categoryOffer = req.body.categoryOffer;
        const typeOffer = req.body.typeOffer;

        const userId = req.user.userId; //recupère l'id de l'employeur connecté

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

//route qui retourne toutes les offres des employeurs
router.get("/myAllOffer", passport, async (req, res) => {
    try {
        const userId = req.user.userId;

        const offer = await Offer.findAll({
            where: {
                employerId: userId,
            },
            include: [
                {
                    model: CategoryJob,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                    },
                },
                {
                    model: TypeOffer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            res.status(404).json({
                err: "Il n'y a pas d'offre posté par l'employeur !",
            });
        }

        return res.json(offer);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

//route qui retourne une offre en perticulier de l'employeur
router.get("/myOffer/:id", passport, async (req, res) => {
    try {
        const offerId = req.params.id;
        const userId = req.user.userId;

        const offer = await Offer.findOne({
            where: {
                id: offerId,
                employerId: userId,
            },
            include: [
                {
                    model: CategoryJob,
                },
                {
                    model: TypeOffer,
                },
            ],
        });

        if (offer == null || offer == "") {
            res.status(404).json({ err: "Il n'y a pas d'offre à afficher !" });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui update l'offre de l'empoyeur
// router.post("/updateMyOffer", passport, async (req, res) => {

// });

//route qui permet au candidat de de consulter toute les offres(hors filtre)
router.get("/AllOffer", async (req, res) => {
    try {
        const offer = await Offer.findAll({
            include: [
                {
                    model: Employer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                    },
                },
                {
                    model: CategoryJob,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                    },
                },
                {
                    model: TypeOffer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            res.status(404).json({
                err: "Il n'y a pas d'offre à afficher !",
            });
        }

        return res.json(offer);
    } catch (error) {}
});

module.exports = router;
