const express = require("express");
const { Admin, Login } = require("../model/schema");
const router = express.Router();
const passport = require("../auth/passport");
const { passwordHash, compareHash } = require("../bcrypt");

router.get("/", passport, async (req, res) => {
    try {
        const userId = req.user.userId;

        const admin = await Admin.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    model: Login,
                },
            ],
        });

        return res.json(admin);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.post("/updateAdmin", passport, async (req, res) => {
    try {
        const loginId = req.user.loginId;

        const mail = req.body.mail;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const firstName = req.body.firstName;
        const name = req.body.name;

        let isNewPassword = true;

        const admin = await Admin.findOne({
            where: {
                loginId: loginId,
            },
            include: [
                {
                    model: Login,
                },
            ],
        });
        const login = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        const checkPassword = await compareHash(password, login.password);

        if (login == null || login == "") {
            return res.status(404).json({ err: "Le mail existe pas !" });
        }
        if (admin == null || admin == "") {
            return res.status(404).json({ err: "L'admin n'existe pas !" });
        }
        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(mail) || mail.length < 7) {
            return res
                .status(404)
                .json({ err: "Veuillez entrer un email valide" });
        }
        if (checkPassword == false) {
            return res.status(404).json({
                err: "Mot de passe incorrect",
            });
        }

        if (newPassword == null || newPassword == "") {
            isNewPassword = false;
        }
        if (isNewPassword == true && newPassword.length < 6) {
            return res.status(404).json({
                err: "Veuillez entrer un mot de passe à 6 caracères !",
            });
        }

        if (firstName.length < 2 || !/^[aA-zZ]+$/.test(firstName)) {
            return res.status(404).json({
                err: "Veuillez entrer un prenom avec min 2 caractères",
            });
        }
        if (name.length < 2 || !/^[aA-zZ]+$/.test(name)) {
            return res.status(404).json({
                err: "Veuillez entrer un nom avec min 2 caractères",
            });
        }

        if (checkPassword == true && isNewPassword == false) {
            login.set({
                mail: mail,
                password: await passwordHash(password),
            });

            await login.save();

            admin.set({
                name: name,
                firstName: firstName,
            });

            await admin.save();

            await admin.setLogin(login);
        }

        if (checkPassword == true && isNewPassword == true) {
            login.set({
                mail: mail,
                password: await passwordHash(newPassword),
            });

            await login.save();

            admin.set({
                name: name,
                firstName: firstName,
            });

            await admin.save();

            await admin.setLogin(login);
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
