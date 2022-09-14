require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
    HistoryCandidate,
    Candidate,
    Offer,
    Employer,
    CategoryJob,
    TypeOffer,
    City,
    NotificationEmployer,
} = require("../model/schema");
const passport = require("../auth/passport");

//route qui post dans la DB l'historique des like et dislike d'offre
router.post("/", passport, async (req, res) => {
    try {
        const userId = req.user.userId;
        const offerId = req.body.offerId;
        const like = req.body.like;
        const dislike = req.body.dislike;
        let employerId = "";

        const historyCand = await HistoryCandidate.create({
            like: like,
            dislike: dislike,
        });

        const cand = await Candidate.findOne({
            where: {
                id: userId,
            },
        });

        const offer = await Offer.findOne({
            where: {
                id: offerId,
            },
        });

        if (cand == null || cand == "") {
            return res.status(404).json({
                err: "Candidat introuvable !",
            });
        }

        if (offer == null || offer == "") {
            return res.status(404).json({
                err: "Offre introuvable !",
            });
        } else {
            employerId = offer.employerId;
        }

        const emp = await Employer.findOne({
            where: {
                id: employerId,
            },
        });

        if (like == true) {
            const notifEmployer = await NotificationEmployer.create({
                msg: cand.firstName + " a liké votre offre : " + offer.title,
                visited: false,
            });

            await notifEmployer.setEmployer(emp);
            await notifEmployer.setOffer(offer);
            await notifEmployer.setCandidate(cand);
        }

        await historyCand.setCandidate(cand);
        await historyCand.setOffer(offer);

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.get("/allMyHistoryCandidate", passport, async (req, res) => {
    try {
        const userId = req.user.userId;

        const history = await HistoryCandidate.findAll({
            where: {
                candidateId: userId,
            },
            include: [
                {
                    model: Offer,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
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
                                exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                            },
                        },
                        {
                            model: City,
                            attributes: {
                                exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                            },
                        },
                    ],
                },
                {
                    model: Candidate,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"], //suprimer les atributs "updatedAt", "createdAt" du json
                    },
                },
            ],
        });

        if (history == null || history == "") {
            return res.status(404).json({
                err: "Pas d'historique !",
            });
        }

        return res.json(history);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
