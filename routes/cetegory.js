const express = require("express");
const passport = require("../auth/passport");
const CategoryJob = require("../model/categoryJob");
const router = express.Router();

//route qui recupere les categorie
router.get("/allCategory", passport, async (req, res) => {
    try {
        const cat = await CategoryJob.findAll({
            attributes: ["id", "name"],
            order: [["createdAt", "DESC"]],
        });
        return res.json(cat);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui cree une categorie coté admin
router.post("/addCategory", passport, async (req, res) => {
    try {
        const categoryName = req.body.categoryName;

        const categoryExist = await CategoryJob.findAll({
            where: {
                name: categoryName,
            },
        });

        if (categoryExist == null || categoryExist == "") {
            const category = await CategoryJob.create({
                name: categoryName,
            });
            return res.json(category);
        } else {
            return res.status(404).json({ err: "La catégorie existe déjà !" });
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

//route qui supprime une catégorie
router.delete("/deleteCategory", passport, async (req, res) => {
    try {
        const catId = req.body.catId;

        const cat = await CategoryJob.findOne({
            where: {
                id: catId,
            },
        });

        if (cat) {
            await cat.destroy();
        } else {
            return res.status(404).json({ err: "La catégorie n'existe pas !" });
        }

        return res.json(true);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});

module.exports = router;
