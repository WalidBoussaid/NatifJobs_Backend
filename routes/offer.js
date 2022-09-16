const express = require("express");
const router = express.Router();
const {
    Offer,
    Employer,
    CategoryJob,
    TypeOffer,
    City,
    HistoryCandidate,
    HistoryEmployer,
    NotificationCandidate,
    NotificationEmployer,
    Match,
    Message,
} = require("../model/schema");
const passport = require("../auth/passport");
const { Op } = require("sequelize");

//route qui cree une offre
router.post("/addOffer", passport, async (req, res) => {
    //passport me permet de recuprer via req.user.userId l'id de l'employeur connecté
    try {
        const title = req.body.title;
        const description = req.body.description;
        const categoryOffer = req.body.categoryOffer;
        const typeOffer = req.body.typeOffer;
        const cityId = req.body.cityId;

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

        const city = await City.findOne({
            where: {
                id: cityId,
            },
        });

        if (employer == null || employer == "") {
            return res.status(404).json({ err: "L'employeur n'esxiste pas !" });
        }
        if (category == null || category == "") {
            return res
                .status(404)
                .json({ err: "La categorie n'esxiste pas !" });
        }
        if (city == null || city == "") {
            return res.status(404).json({ err: "La ville n'esxiste pas !" });
        }
        if (type == null || type == "") {
            return res
                .status(404)
                .json({ err: "Le type d'offre n'esxiste pas !" });
        }
        if (title.length < 4) {
            return res.status(404).json({
                err: "Titre pas confomre (min 4 caractères)!",
            });
        }
        if (description.length < 10) {
            return res.status(404).json({
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
        await offer.setCity(city);

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui retourne toutes les offres des employeurs
router.post("/myAllOffer", passport, async (req, res) => {
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
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            return res.status(404).json({
                err: "Il n'y a pas d'offre posté par l'employeur !",
            });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
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
                {
                    model: City,
                },
            ],
        });

        if (offer == null || offer == "") {
            return res
                .status(404)
                .json({ err: "Il n'y a pas d'offre à afficher !" });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui update l'offre de l'empoyeur
router.post("/updateMyOffer/:id", passport, async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const categoryId = req.body.categoryId;
        const typeOfferId = req.body.typeOfferId;
        const cityId = req.body.cityId;

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
                {
                    model: City,
                },
            ],
        });

        const category = await CategoryJob.findOne({
            where: {
                id: categoryId,
            },
        });

        const type = await TypeOffer.findOne({
            where: {
                id: typeOfferId,
            },
        });

        const cityObj = await City.findOne({
            where: {
                id: cityId,
            },
        });

        if (offer == null || offer == "") {
            return res
                .status(404)
                .json({ err: "Il n'y a pas d'offre trouver !" });
        }
        if (category == null || category == "") {
            return res.status(404).json({
                err: "Il n'y a pas de categorie trouver !",
            });
        }
        if (cityObj == null || cityObj == "") {
            return res.status(404).json({
                err: "Il n'y a pas de ville trouver !",
            });
        }
        if (type == null || type == "") {
            return res.status(404).json({
                err: "Il n'y a pas de type d'offre trouver !",
            });
        }
        if (categoryId == null || categoryId == "") {
            return res
                .status(404)
                .json({ err: "La categorie n'esxiste pas !" });
        }
        if (typeOfferId == null || typeOfferId == "") {
            return res
                .status(404)
                .json({ err: "Le type d'offre n'esxiste pas !" });
        }
        if (title.length < 4) {
            return res.status(404).json({
                err: "Titre pas confomre (min 4 caractères)!",
            });
        }
        if (description.length < 10) {
            return res.status(404).json({
                err: "Description pas confomre (min 10 caractères)!",
            });
        }

        //Modification valeurs des colonnes title et description de l'objet Offer
        offer.set({
            title: title,
            description: description,
        });

        await offer.save(); //save l'objet offer avec les nouvelles valeurs des colonnes title et description

        await offer.setCategoryJob(category);
        await offer.setTypeOffer(type);
        await offer.setCity(cityObj);

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime l'offre de l'employeur
router.delete("/deleteOffer/:id", passport, async (req, res) => {
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
        const histCand = await HistoryCandidate.findAll({
            where: { offerId: offerId },
        });
        const histEmp = await HistoryEmployer.findAll({
            where: { offerId: offerId },
        });
        const notifCand = await NotificationCandidate.findAll({
            where: { offerId: offerId },
        });
        const notifEmp = await NotificationEmployer.findAll({
            where: { offerId: offerId },
        });
        const match = await Match.findAll({
            where: { offerId: offerId },
        });
        let id = [];
        match.forEach((obj) => id.push(obj.id));
        const msg = await Message.findAll({
            where: { matchId: id },
        });

        if (offer) {
            for (let i = 0; i < histCand.length; i++) {
                await histCand[i].destroy();
            }
            for (let i = 0; i < histEmp.length; i++) {
                await histEmp[i].destroy();
            }
            for (let i = 0; i < notifCand.length; i++) {
                await notifCand[i].destroy();
            }
            for (let i = 0; i < notifEmp.length; i++) {
                await notifEmp[i].destroy();
            }
            for (let i = 0; i < match.length; i++) {
                await match[i].destroy();
            }
            for (let i = 0; i < msg.length; i++) {
                await msg[i].destroy();
            }
            await offer.destroy();
        } else {
            return res.status(404).json({ err: "L'offre n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui permet au candidat de de consulter toute les offres(hors filtre)
router.get("/AllOffer", passport, async (req, res) => {
    try {
        const userId = req.user.userId;
        const offerInHistory = [];

        const history = await HistoryCandidate.findAll({
            where: {
                candidateId: userId,
            },
        });

        if (history !== null) {
            history.forEach((obj) => offerInHistory.push(obj.offerId));
        }

        const offer = await Offer.findAll({
            where: {
                id: {
                    [Op.notIn]: offerInHistory,
                },
            },
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
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            return res.status(404).json({
                err: "Il n'y a pas d'offre à afficher !",
            });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui recupere les donnees de l'offre coté candidat
router.get("/OfferSelected/:id", passport, async (req, res) => {
    try {
        const offerId = req.params.id;

        const offer = await Offer.findOne({
            where: {
                id: offerId,
            },
            include: [
                {
                    model: CategoryJob,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
                {
                    model: TypeOffer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
                {
                    model: Employer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            return res
                .status(404)
                .json({ err: "Il n'y a pas d'offre à afficher !" });
        }

        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui renvoi la liste des offres les avoir filtrer
router.post("/OfferFiltred", passport, async (req, res) => {
    let categoryId = req.body.categoryId;
    let typeOfferId = req.body.typeOfferId;
    let cityId = req.body.cityId;
    let cattemp = [];
    let citytemp = [];
    let typetemp = [];
    const offerInHistory = [];

    try {
        const history = await HistoryCandidate.findAll({
            where: {
                candidateId: userId,
            },
        });

        if (history !== null) {
            history.forEach((obj) => offerInHistory.push(obj.offerId));
        }
        const cat = await CategoryJob.findAll({
            attributes: ["id"],
        });
        const city = await City.findAll({
            attributes: ["id"],
        });
        const type = await TypeOffer.findAll({
            attributes: ["id"],
        });
        if (categoryId == null) {
            cat.forEach((obj) => cattemp.push(obj.id));
            categoryId = cattemp;
        }
        if (typeOfferId == null) {
            type.forEach((obj) => typetemp.push(obj.id));
            typeOfferId = typetemp;
        }
        if (cityId == null) {
            city.forEach((obj) => citytemp.push(obj.id));
            cityId = citytemp;
        }
        const offer = await Offer.findAll({
            where: {
                id: {
                    [Op.notIn]: offerInHistory,
                },
                cityId: cityId,
                typeOfferId: typeOfferId,
                categoryJobId: categoryId,
            },
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
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });

        if (offer == null || offer == "") {
            return res.status(404).json({
                err: "Il n'y a pas d'offre à afficher !",
            });
        }
        return res.json(offer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
