const express = require("express");
const passport = require("../auth/passport");
const NotificationEmployer = require("../model/notificationEmployer");
const router = express.Router();

//route qui recupere les notif employer
router.get("/allNotif", passport, async (req, res) => {
    const userId = req.user.userId;
    try {
        const notif = await NotificationEmployer.findAll({
            where: {
                employerId: userId,
            },
            order: [["createdAt", "DESC"]],
        });
        return res.json(notif);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui update les notif employer
router.post("/updateNotif", passport, async (req, res) => {
    const userId = req.user.userId;
    const notifVisitedId = req.body.notifVisitedId;
    try {
        const notif = await NotificationEmployer.findOne({
            where: {
                id: notifVisitedId,
            },
        });

        notif.set({ visited: true });
        notif.save();

        const notifAll = await NotificationEmployer.findAll({
            where: {
                employerId: userId,
            },
            order: [["createdAt", "DESC"]],
        });

        return res.json(notifAll);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
