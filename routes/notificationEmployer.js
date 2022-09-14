const express = require("express");
const passport = require("../auth/passport");
const NotificationEmployer = require("../model/notificationEmployer");
const router = express.Router();

//route qui recupere les notif employer
router.get("/allNotif", passport, async (req, res) => {
    try {
        const notif = await NotificationEmployer.findAll();
        return res.json(notif);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;