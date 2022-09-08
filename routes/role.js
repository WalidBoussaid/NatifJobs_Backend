const express = require("express");
const { Login, Candidate, Employer } = require("../model/schema");
const router = express.Router();
const passport = require("../auth/passport");

/* GET users listing. */
router.get("/candidate", passport, async (req, res) => {
    try {
        const user = req.user;

        const candidate = await Candidate.findOne({
            where: {
                loginId: user.loginId,
            },
        });

        return res.json(candidate);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.get("/employer", passport, async (req, res) => {
    try {
        const user = req.user;

        const employer = await Employer.findOne({
            where: {
                loginId: user.loginId,
            },
        });

        return res.json(employer);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
