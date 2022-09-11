require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Login, Employer, Role, Candidate, City } = require("../model/schema");
const { generetaTokenJWT } = require("../auth/jwtAuth");

router.post("/employer", async (req, res) => {
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        const name = req.body.name;
        const email = req.body.mail;
        const cityId = req.body.cityId;
        const adress = req.body.adress;
        const postalCode = req.body.postalCode;
        const phone = req.body.phone;
        const profilImg = req.body.profilImg;
        const website = req.body.website;

        const login = await Login.findOne({
            where: {
                mail: mail,
            },
        });

        if (login) {
            return res.status(404).json({ err: "Le mail existe dejà !" });
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

        const createLogin = await Login.create({
            mail: mail,
            password: password,
        });

        const emp = await Employer.create({
            name: name,
            email: mail,
            adress: adress,
            postalCode: postalCode,
            phone: phone,
            profilImg: profilImg,
            website: website,
        });

        const role = await Role.findOne({
            where: {
                roleName: "employer",
            },
        });
        const city = await City.findOne({
            where: {
                id: cityId,
            },
        });
        if (city == null || city == "") {
            return res.status(404).json({
                err: "La ville n'existe pas !",
            });
        }

        if (role == null || role == "") {
            return res.status(404).json({
                err: "Role employeur introuvable !",
            });
        }

        await emp.setLogin(createLogin);
        await emp.setRole(role);
        await emp.setCity(city);
        res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

router.post("/candidate", async (req, res) => {
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

        const login = await Login.findOne({
            where: {
                mail: mail,
            },
        });

        if (login) {
            return res.status(404).json({ err: "Le mail existe dejà !" });
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
                err: "Veuillez entrer une adresse avec min 5 caractères",
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

        const createLogin = await Login.create({
            mail: mail,
            password: password,
        });

        const cand = await Candidate.create({
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

        const role = await Role.findOne({
            where: {
                roleName: "candidate",
            },
        });

        if (role == null || role == "") {
            return res.status(404).json({
                err: "Role candidat introuvable !",
            });
        }

        await cand.setLogin(createLogin);
        await cand.setRole(role);
        res.json(cand);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
