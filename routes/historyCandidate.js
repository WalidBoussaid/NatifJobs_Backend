const express = require("express");
const { HistoryCandidate, Candidate, Offer } = require("../model/schema");
const router = express.Router();
const passport = require("../auth/passport");

router.post("/", passport, async (req, res) => {
    const userId = req.user.userId;
    const offerId = req.body.offerId;
    const like = req.body.like;
    const dislike = req.body.dislike;

    try {
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
        }

        await historyCand.setCandidate(cand);
        await historyCand.setOffer(offer);

        return res.json(historyCand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});
