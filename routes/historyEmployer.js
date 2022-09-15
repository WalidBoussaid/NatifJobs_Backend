const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const NotifCandidate = require("../model/notificationCandidate");
const {
    HistoryEmployer,
    Employer,
    Candidate,
    Offer,
    Match,
} = require("../model/schema");

//route qui cree l'historique + match si like + notif candidate
router.post("/createHistoryEmployer", passport, async (req, res) => {
    const userId = req.user.userId;
    const offerId = req.body.offerId;
    const candId = req.body.candidatId;
    const like = req.body.like;
    const dislike = req.body.dislike;

    try {
        const employer = await Employer.findOne({
            where: {
                id: userId,
            },
        });

        const offer = await Offer.findOne({
            where: {
                id: offerId,
            },
        });

        const candidate = await Candidate.findOne({
            where: {
                id: candId,
            },
        });

        if (employer == null) {
            return res.status(404).json({ err: "L'employer n'existe pas !" });
        }
        if (offer == null) {
            return res.status(404).json({ err: "L'offre n'existe pas !" });
        }
        if (candidate == null) {
            return res.status(404).json({ err: "Le candidat n'existe pas !" });
        }

        if (like == true) {
            const historyEmp = await HistoryEmployer.create({
                like: like,
                dislike: dislike,
            });

            await historyEmp.setEmployer(employer);
            await historyEmp.setOffer(offer);
            await historyEmp.setCandidate(candidate);

            const match = await Match.create();

            await match.setEmployer(employer);
            await match.setOffer(offer);
            await match.setCandidate(candidate);

            const notifCandidate = await NotifCandidate.create({
                msg:
                    "SUPER vous avez matché avec " +
                    employer.name +
                    " pour l'offre : " +
                    offer.title,
                visited: false,
            });

            await notifCandidate.setEmployer(employer);
            await notifCandidate.setOffer(offer);
            await notifCandidate.setCandidate(candidate);
        } else {
            const historyEmp = await HistoryEmployer.create({
                like: like,
                dislike: dislike,
            });

            await historyEmp.setEmployer(employer);
            await historyEmp.setOffer(offer);
            await historyEmp.setCandidate(candidate);
        }

        return res.json(true);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

//route qui retourne un historique de l'employeur
router.post("/findOneHistoryEmployer", passport, async (req, res) => {
    const userId = req.user.userId;
    const offerId = req.body.offerId;
    const candId = req.body.candidatId;

    try {
        const historyEmp = await HistoryEmployer.findOne({
            where: {
                employerId: userId,
                offerId: offerId,
                candidateId: candId,
            },
        });

        return res.json(historyEmp);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports = router;
