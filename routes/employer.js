const express = require("express");
const City = require("../model/city");
const Login = require("../model/login");
const Employer = require("../model/employer");
const router = express.Router();
const passport = require("../auth/passport");

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

router.post("/employerUpdate/:id", passport, async (req, res) => {
    const loginId = req.user.loginId;
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

        login.set({
            mail: mail,
            password: password,
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
        return res.json(emp);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
