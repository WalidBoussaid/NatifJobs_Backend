const express = require("express");
const City = require("../model/city");
const Login = require("../model/login");
const Employer = require("../model/employer");
const HistoryCandidate = require("../model/historyCandidate");
const HistoryEmployer = require("../model/historyEmployer");
const Message = require("../model/message");
const Match = require("../model/match");
const NotifCandidate = require("../model/notificationCandidate");
const NotifEmployer = require("../model/notificationEmployer");
const Offer = require("../model/offer");
const Rdv = require("../model/rdv");
const router = express.Router();
const passport = require("../auth/passport");
const { passwordHash, compareHash } = require("../bcrypt");

//route qui retourne un employer coté employer
router.get("/oneEmployer/:id", passport, async (req, res) => {
    const userId = req.user.userId; //recupère l'id du candidat connecté
    try {
        const emp = await Employer.findOne({
            where: {
                id: userId,
            },
            include: [
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });
        return res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui retourne un employeur coté admin
router.post("/findEmployer/:id", passport, async (req, res) => {
    const empId = req.body.empId;
    try {
        const emp = await Employer.findOne({
            where: {
                id: empId,
            },
            include: [
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });
        return res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.get("/AllEmployer", passport, async (req, res) => {
    try {
        const emp = await Employer.findAll();
        return res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.post("/employerUpdate/:id", passport, async (req, res) => {
    const loginId = req.user.loginId;
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const name = req.body.name;
        const email = req.body.mail;
        const cityId = req.body.cityId;
        const adress = req.body.adress;
        const postalCode = req.body.postalCode;
        const phone = req.body.phone;
        const profilImg = req.body.profilImg;
        const website = req.body.website;

        let isNewPassword = true;

        const login = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        const emp = await Employer.findOne({
            where: {
                loginId: loginId,
            },
        });

        const city = await City.findOne({
            where: {
                id: cityId,
            },
        });

        const checkPassword = await compareHash(password, login.password);

        if (login == null || login == "") {
            return res.status(404).json({ err: "Le mail existe pas !" });
        }
        if (emp == null || emp == "") {
            return res.status(404).json({ err: "L'employeur n'existe pas !" });
        }
        if (city == null || city == "") {
            return res.status(404).json({ err: "La ville existe pas !" });
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
                err: "Veuillez entrer un nouveau mot de passe à 6 caracères !",
            });
        }
        if (name.length < 2) {
            return res.status(404).json({
                err: "Veuillez entrer un nom avec min 2 caractères",
            });
        }

        if (adress.length < 5) {
            return res.status(404).json({
                err: "Veuillez entrer une adresse avec min 5 caractères",
            });
        }
        if (postalCode.length != 4) {
            return res.status(404).json({
                err: "Veuillez entrer un code postal valide",
            });
        }
        if (!/^[0-9]{9,13}$/.test(phone) || phone.length == 11) {
            return res.status(404).json({
                err: "Veuillez entrer un numero de telephone valide",
            });
        }
        if (profilImg.length < 5) {
            return res.status(404).json({
                err: "Veuillez entrer une adresse avec min 5 caractères",
            });
        }
        if (
            website.length < 9 ||
            !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
                website
            )
        ) {
            return res.status(404).json({
                err: "Veuillez entrer une adresse avec min 5 caractères",
            });
        }

        if (checkPassword == true && isNewPassword == false) {
            login.set({
                mail: mail,
                password: await passwordHash(password),
            });

            await login.save();

            emp.set({
                name: name,
                email: email,
                adress: adress,
                postalCode: postalCode,
                phone: phone,
                profilImg: profilImg,
                website: website,
            });

            await emp.save();

            await emp.setLogin(login);
            await emp.setCity(city);
        }

        if (checkPassword == true && isNewPassword == true) {
            login.set({
                mail: mail,
                password: await passwordHash(newPassword),
            });

            await login.save();

            emp.set({
                name: name,
                email: email,
                adress: adress,
                postalCode: postalCode,
                phone: phone,
                profilImg: profilImg,
                website: website,
            });

            await emp.save();

            await emp.setLogin(login);
            await emp.setCity(city);
        }

        return res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime un employeur coté admin
router.delete("/deleteEmployer", passport, async (req, res) => {
    const empId = req.body.empId;
    const loginId = req.body.loginId;
    try {
        const emp = await Employer.findOne({
            where: {
                id: empId,
            },
        });
        const offer = await Offer.findAll({
            where: {
                employerId: empId,
            },
        });

        let offerId = [];
        offer.forEach((obj) => offerId.push(obj.id));

        const match = await Match.findAll({
            where: {
                employerId: empId,
            },
        });

        let id = [];
        match.forEach((obj) => id.push(obj.id));

        const msg = await Message.findAll({
            where: {
                matchId: id,
            },
        });
        const notifcand = await NotifCandidate.findAll({
            where: {
                employerId: empId,
            },
        });
        const notifEmp = await NotifEmployer.findAll({
            where: {
                employerId: empId,
            },
        });
        const rdv = await Rdv.findAll({
            where: {
                employerId: empId,
            },
        });
        const histCand = await HistoryCandidate.findAll({
            where: {
                offerId: offerId,
            },
        });
        const histEmp = await HistoryEmployer.findAll({
            where: {
                employerId: empId,
            },
        });
        const log = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        if (emp) {
            for (let i = 0; i < msg.length; i++) {
                await msg[i].destroy();
            }
            for (let i = 0; i < match.length; i++) {
                await match[i].destroy();
            }
            for (let i = 0; i < histCand.length; i++) {
                await histCand[i].destroy();
            }
            for (let i = 0; i < histEmp.length; i++) {
                await histEmp[i].destroy();
            }
            for (let i = 0; i < notifcand.length; i++) {
                await notifcand[i].destroy();
            }
            for (let i = 0; i < notifEmp.length; i++) {
                await notifEmp[i].destroy();
            }
            for (let i = 0; i < rdv.length; i++) {
                await rdv[i].destroy();
            }
            for (let i = 0; i < offer.length; i++) {
                await offer[i].destroy();
            }
            await log.destroy();

            await emp.destroy();
        } else {
            return res.status(404).json({ err: "L'employeur n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
