require("dotenv").config();
const express = require("express");
const { Login, Candidate, Employer, Admin } = require("../model/schema");
const router = express.Router();
const { generetaTokenJWT } = require("../auth/jwtAuth");
const passport = require("../auth/passport");
const { compareHash, passwordHash } = require("../bcrypt");
const nodemailer = require("nodemailer");

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

        const checkPassword = await compareHash(password, login.password);

        console.log(password);

        //verifier le password est correct
        if (checkPassword == true) {
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

//route qui renitialise le password et met à jour le login
router.post("/ressetPassword", async (req, res) => {
    const mail = req.body.mail;

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    try {
        function generateString(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }

            return result;
        }

        let password = generateString(6);

        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "natifjobs@gmail.com",
                pass: "ghwjyqvrclmaueco",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailDetails = {
            from: "natifjobs@gmail.com",
            to: "walidmeknessi@gmail.com",
            subject: "Rénitialisation mot de passe",
            text: "Voici votre nouveau mot de passse: " + password,
        };

        const login = await Login.findOne({
            where: {
                mail: mail,
            },
        });

        login.set({
            password: await passwordHash(password),
        });

        await login.save();

        mailTransporter.sendMail(mailDetails, (err, info) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Email envoyé");
            }
        });

        return res.json(password);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
