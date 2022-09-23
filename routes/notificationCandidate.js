const express = require("express");
const passport = require("../auth/passport");
const NotificationCandidate = require("../model/notificationCandidate");
const router = express.Router();

//route qui recupere les notif candidate
router.get("/allNotif", passport, async (req, res) => {
    const userId = req.user.userId;
    try {
        const notif = await NotificationCandidate.findAll({
            where: {
                candidateId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        return res.json(notif);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui update les notif candidate
router.post("/updateNotif", passport, async (req, res) => {
    const userId = req.user.userId;
    const notifVisitedId = req.body.notifVisitedId;
    try {
        const notif = await NotificationCandidate.findOne({
            where: {
                id: notifVisitedId,
            },
        });

        notif.set({ visited: true });
        notif.save();

        const notifAll = await NotificationCandidate.findAll({
            where: {
                candidateId: userId,
            },
            order: [["createdAt", "DESC"]],
        });

        return res.json(notifAll);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.get("/allNewNotif", passport, async (req, res) => {
    const userId = req.user.userId;
    try {
        const newNotif = await NotificationCandidate.findAll({
            where: {
                candidateId: userId,
                visited: false,
            },
        });

        return res.json(newNotif);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
