const express = require("express");
const passport = require("../auth/passport");
const Candidate = require("../model/candidate");
const City = require("../model/city");
const Login = require("../model/login");
const HistoryCandidate = require("../model/historyCandidate");
const HistoryEmployer = require("../model/historyEmployer");
const Message = require("../model/message");
const Match = require("../model/match");
const NotifCandidate = require("../model/notificationCandidate");
const NotifEmployer = require("../model/notificationEmployer");
const Rdv = require("../model/rdv");

const router = express.Router();

//route qui retourne un candidat coté candidate
router.get("/AllCandidate", passport, async (req, res) => {
    try {
        const cand = await Candidate.findAll({
            include: [
                {
                    model: City,
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                },
            ],
        });
        return res.json(cand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});
//route qui retourne un candidat coté candidate
router.get("/oneCandidate/:id", passport, async (req, res) => {
    const userId = req.user.userId; //recupère l'id du candidat connecté
    try {
        const cand = await Candidate.findOne({
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
        return res.json(cand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui retourne un candidat coté employer
router.post("/findCandidate/:id", passport, async (req, res) => {
    const candId = req.body.candId;
    try {
        const cand = await Candidate.findOne({
            where: {
                id: candId,
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
        return res.json(cand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui met à jour les info du candidat
router.post("/updateCandidate/:id", passport, async (req, res) => {
    const loginId = req.user.loginId; //recupère l'idLogin du candidat connecté
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.mail;
        const profilImg = req.body.profilImg;
        const nationality = req.body.nationality;
        const adress = req.body.adress;
        const postalCode = req.body.postalCode;
        const dateOfBirth = req.body.dateOfBirth;
        const lastDiplomaObtained = req.body.lastDiplomaObtained;
        const lastExperiencepro = req.body.lastExperiencepro;
        const hobbies = req.body.hobbies;
        const cv = req.body.cv;
        const cityId = req.body.cityId;

        const login = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        const cand = await Candidate.findOne({
            where: {
                loginId: loginId,
            },
        });

        const city = await City.findOne({
            where: {
                id: cityId,
            },
        });

        if (login == null || login == "") {
            return res.status(404).json({ err: "Le mail existe pas !" });
        }
        if (cand == null || cand == "") {
            return res.status(404).json({ err: "Le candidat existe pas !" });
        }
        if (city == null || city == "") {
            return res.status(404).json({ err: "La ville existe pas !" });
        }
        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(mail) || mail.length < 7) {
            return res
                .status(404)
                .json({ err: "Veuillez entrer un email valide" });
        }
        if (password.length < 6) {
            return res.status(404).json({
                err: "Veuillez entrer un mot de passe à min 6 caractères",
            });
        }
        if (firstName.length < 2 || !/^[aA-zZ]+$/.test(firstName)) {
            return res.status(404).json({
                err: "Veuillez entrer un prenom avec min 2 caractères",
            });
        }
        if (lastName.length < 2 || !/^[aA-zZ]+$/.test(lastName)) {
            return res.status(404).json({
                err: "Veuillez entrer un nom avec min 2 caractères",
            });
        }
        if (adress.length < 5) {
            return res.status(404).json({
                err: "Veuillez entrer une adresse avec min 5 caractères",
            });
        }
        if (postalCode.length !== 4 || !/^[1-9]{1}[0-9]{3}$/.test(postalCode)) {
            return res.status(404).json({
                err: "Veuillez entrer un code postal valide",
            });
        }

        if (profilImg.length < 5) {
            return res.status(404).json({
                err: "Veuillez entrer une image avec min 5 caractères",
            });
        }
        if (nationality.length < 4 || !/^[aA-zZ]+$/.test(nationality)) {
            return res.status(404).json({
                err: "Veuillez entrer votre nationalité avec min 4 caractères",
            });
        }
        if (
            dateOfBirth.length !== 10 ||
            !/^[0-9]{1,2}[/]{1}[0-9]{1,2}[/]{1}[0-9]{4}$/.test(dateOfBirth)
        ) {
            return res.status(404).json({
                err: "Veuillez entrer une date de naissance valide",
            });
        }
        if (lastDiplomaObtained.length < 4) {
            return res.status(404).json({
                err: "Veuillez entrer votre dernier diplome avec min 4 caractères",
            });
        }
        if (lastExperiencepro.length < 4) {
            return res.status(404).json({
                err: "Veuillez entrer votre derniere experience pro avec  min 4 caractères",
            });
        }
        if (hobbies.length < 4) {
            return res.status(404).json({
                err: "Veuillez entrer vos hobbys avec  min 4 caractères",
            });
        }
        if (cv.length < 4) {
            return res.status(404).json({
                err: "Veuillez entrer vos hobbys avec  min 4 caractères",
            });
        }

        login.set({
            mail: mail,
            password: password,
        });

        await login.save();

        cand.set({
            firstName: firstName,
            lastName: lastName,
            email: mail,
            profilImg: profilImg,
            nationality: nationality,
            adress: adress,
            postalCode: postalCode,
            dateOfBirth: dateOfBirth,
            lastDiplomaObtained: lastDiplomaObtained,
            lastExperiencepro: lastExperiencepro,
            hobbies: hobbies,
            cv: cv,
        });

        await cand.save();

        await cand.setLogin(login);
        await cand.setCity(city);

        return res.json(cand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime un candidat coté admin
router.delete("/deleteCandidate", passport, async (req, res) => {
    const candId = req.body.candId;
    const loginId = req.body.loginId;
    try {
        const cand = await Candidate.findOne({
            where: {
                id: candId,
            },
        });
        const match = await Match.findAll({
            where: {
                candidateId: candId,
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
                candidateId: candId,
            },
        });
        const notifEmp = await NotifEmployer.findAll({
            where: {
                candidateId: candId,
            },
        });
        const rdv = await Rdv.findAll({
            where: {
                candidateId: candId,
            },
        });
        const histCand = await HistoryCandidate.findAll({
            where: {
                candidateId: candId,
            },
        });
        const histEmp = await HistoryEmployer.findAll({
            where: {
                candidateId: candId,
            },
        });
        const log = await Login.findOne({
            where: {
                id: loginId,
            },
        });

        if (cand) {
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
            await log.destroy();

            await cand.destroy();
        } else {
            return res.status(404).json({ err: "Le candidat n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
