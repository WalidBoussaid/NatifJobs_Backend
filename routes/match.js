const express = require("express");
const passport = require("../auth/passport");
const Match = require("../model/match");
const { Employer, Candidate, Offer } = require("../model/schema");
const router = express.Router();

//route qui recupere les match employer
router.get("/allMatchEmployer", passport, async (req, res) => {
    const userId = req.user.userId;
    try {
        const match = await Match.findAll({
            where: {
                employerId: userId,
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Employer,
                },
                {
                    model: Candidate,
                },
                {
                    model: Offer,
                },
            ],
        });
        return res.json(match);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui recupere les match candidate
router.get("/allMatchCandidate", passport, async (req, res) => {
    const userId = req.user.userId;
    try {
        const match = await Match.findAll({
            where: {
                candidateId: userId,
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Employer,
                },
                {
                    model: Candidate,
                },
                {
                    model: Offer,
                },
            ],
        });
        return res.json(match);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
