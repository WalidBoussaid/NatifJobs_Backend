const express = require("express");
const passport = require("../auth/passport");
const {
    Message,
    Employer,
    Candidate,
    Match,
    NotificationEmployer,
    Offer,
    NotificationCandidate,
} = require("../model/schema");
const router = express.Router();

//route qui recupere les msg
router.post("/allMessage", passport, async (req, res) => {
    const matchId = req.body.matchId;
    try {
        const msg = await Message.findAll({
            where: {
                matchId: matchId,
            },
            include: [
                {
                    model: Employer,
                },
                {
                    model: Candidate,
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        return res.json(msg);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});
//route qui cree un msg coté employer
router.post("/createMessage", passport, async (req, res) => {
    const matchId = req.body.matchId;
    const userId = req.user.userId;
    const msg = req.body.msg;

    try {
        const message = await Message.create({
            msg: msg,
        });

        const emp = await Employer.findOne({
            where: {
                id: userId,
            },
        });

        const match = await Match.findOne({
            where: {
                id: matchId,
            },
        });

        const offer = await Offer.findOne({
            where: {
                id: match.offerId,
            },
        });

        const cand = await Candidate.findOne({
            where: {
                id: match.candidateId,
            },
        });

        const newNotif = await NotificationCandidate.create({
            msg: "Vous avez reçu un nouveau message de " + emp.name,
            visited: false,
        });

        await newNotif.setCandidate(cand);
        await newNotif.setOffer(offer);
        await newNotif.setEmployer(emp);

        await message.setEmployer(emp);
        await message.setMatch(match);

        match.set({
            employerId: 0,
        });
        match.save();
        match.set({
            employerId: userId,
        });
        match.save();

        return res.json(message);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});
//route qui cree un msg coté candidate
router.post("/createMessageCand", passport, async (req, res) => {
    const matchId = req.body.matchId;
    const userId = req.user.userId;
    const msg = req.body.msg;

    try {
        const message = await Message.create({
            msg: msg,
        });

        const cand = await Candidate.findOne({
            where: {
                id: userId,
            },
        });

        const match = await Match.findOne({
            where: {
                id: matchId,
            },
        });

        const emp = await Employer.findOne({
            where: {
                id: match.employerId,
            },
        });

        const offer = await Offer.findOne({
            where: {
                id: match.offerId,
            },
        });

        const newNotif = await NotificationEmployer.create({
            msg: "Vous avez reçu un nouveau message de " + cand.firstName,
            visited: false,
        });

        await newNotif.setCandidate(cand);
        await newNotif.setOffer(offer);
        await newNotif.setEmployer(emp);
        await newNotif.setMatch(match);

        await message.setCandidate(cand);
        await message.setMatch(match);

        match.set({
            candidateId: 0,
        });
        match.save();
        match.set({
            candidateId: userId,
        });
        match.save();

        return res.json(message);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
