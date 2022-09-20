require("dotenv").config();
const express = require("express");
const { Login, Candidate, Employer, Admin } = require("../model/schema");
const router = express.Router();
const { generetaTokenJWT } = require("../auth/jwtAuth");
const passport = require("../auth/passport");

/* POST login listing. */
router.post("/", async (req, res) => {
    try {
        const mail = req.body.mail;
        const password = req.body.password;

        const login = await Login.findOne({
            where: {
                mail: mail,
            },
            include: [
                {
                    model: Candidate,
                },
                {
                    model: Employer,
                },
                {
                    model: Admin,
                },
            ],
        });

        //si user n'existe pas
        if (login == null || login == "") {
            return res.status(404).json({ err: "Le mail n'existe pas !" });
        }

        //verifier le password est correct
        if (login.password === password) {
            if (login.candidate) {
                const token = generetaTokenJWT(login.id, login.candidate.id);
                return res.json({ token: token, role: "candidate" });
            } else if (login.employer) {
                const token = generetaTokenJWT(login.id, login.employer.id);
                return res.json({ token: token, role: "employer" });
            } else {
                const token = generetaTokenJWT(login.id, login.admin.id);
                return res.json({ token: token, role: "admin" });
            }
        } else {
            return res
                .status(404)
                .json({ err: "Le mot de passe est incorrect !" });
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//retourne le login de l'utilisateur
router.get("/findLogin/:id", passport, async (req, res) => {
    const loginId = req.user.loginId;

    try {
        const login = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        return res.json(login);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
