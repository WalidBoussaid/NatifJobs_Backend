const express = require("express");
const passport = require("../auth/passport");
const { Message, Employer, Candidate, Match } = require("../model/schema");
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

        await message.setEmployer(emp);
        await message.setMatch(match);

        return res.json(message);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
