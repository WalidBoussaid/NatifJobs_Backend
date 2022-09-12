//import connection with database
const sequelize = require("./connection");

//import models
const {
    Candidate,
    Role,
    Employer,
    Offer,
    CategoryJob,
    Login,
    TypeOffer,
    City,
} = require("./schema");

(async () => {
    //creation of model instance
    await sequelize.sync({ force: true });

    // role
    const employer = await Role.create({
        roleName: "employer",
    });
    const candidate = await Role.create({
        roleName: "candidate",
    });

    //city
    const bruxelles = await City.create({
        name: "Bruxelles",
    });
    const liege = await City.create({
        name: "Liège",
    });
    const namur = await City.create({
        name: "Namur",
    });
    const bruges = await City.create({
        name: "Bruges",
    });
    const mons = await City.create({
        name: "Mons",
    });
    const gand = await City.create({
        name: "Gand",
    });
    const charleroi = await City.create({
        name: "Charleroi",
    });
    const anvers = await City.create({
        name: "Anvers",
    });
    const nivelles = await City.create({
        name: "Nivelles",
    });

    //category Job
    const info = await CategoryJob.create({
        name: "Informatique",
    });
    const fin = await CategoryJob.create({
        name: "Finance",
    });
    const construction = await CategoryJob.create({
        name: "Construction",
    });
    const horeca = await CategoryJob.create({
        name: "Horeca",
    });
    const logistique = await CategoryJob.create({
        name: "Logistique",
    });
    const med = await CategoryJob.create({
        name: "Medical",
    });
    const vente = await CategoryJob.create({
        name: "Vente",
    });
    const transport = await CategoryJob.create({
        name: "Transport",
    });
    const jardin = await CategoryJob.create({
        name: "Jardinage",
    });
    const autre = await CategoryJob.create({
        name: "Autre ..",
    });

    //TypeOffer
    const cdi = await TypeOffer.create({
        name: "CDI",
    });
    const cdd = await TypeOffer.create({
        name: "CDD",
    });
    const interim = await TypeOffer.create({
        name: "Intérimaire",
    });

    //Offer
    const offer1 = await Offer.create({
        title: "Junior devloper java",
        description:
            "En tant que Junior Java Developer, vous rejoignez une équipe dynamique organisée de façon Agile / Scrum : gestion d'un backlog, séances de poker planning, stand-up meetings quotidiens, découpe du travail en sprints de 2 à 3 semaines, réunions rétrospectives, Cette organisation permet à chaque membre de l’équipe de s’impliquer fortement dans le projet et de participer aux prises de décisions. Vous prenez part au développement de nouvelles applications en vous basant sur les standards de développement et les frameworks existants. A partir des documents d’analyses fonctionnelles rédigés par les analystes et des consignes techniques transmises par les architectes, vous assurez le développement, le testing et la documentation des applications développées. Vous êtes également responsable de la résolution de bugs liés au code et du développement de nouvelles fonctionnalités...",
    });

    //Login
    const log1 = await Login.create({
        mail: "nduwayezv@cactustore.com",
        password: "123456",
    });
    const log2 = await Login.create({
        mail: "totosprl@gmail.com",
        password: "azerty",
    });

    //Candidate
    const yves = await Candidate.create({
        firstName: "Yves",
        lastName: "Nduwayezv",
        email: " nduwayezv@cactustore.com",
        profilImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_6FS-PjJwSzN6nGbSJng09kxlB55K3-TGBQ&usqp=CAU%22",
        nationality: "Belge",
        adress: "Rue de la ville, 15",
        postalCode: "1030",
        dateOfBirth: "16/04/1994",
        lastDiplomaObtained: "Bachelier Info Gestion",
        lastExperiencepro: "Stage en dev web",
        hobbies: "Foot, Basket, Natation",
        cv: "yves-cv.pdf",
    });

    //Employer
    const emp1 = await Employer.create({
        name: "Toto SPRL",
        email: "totosprl@gmail.com",
        city: "Bruxelles",
        adress: "Rue du tanneur, 17",
        postalCode: "1050",
        phone: "045236541",
        profilImg:
            "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png",

        website: "www.totosprl.com",
    });

    //add role to Candidate/Employer
    await yves.setRole(candidate);
    await emp1.setRole(employer);

    //add login to Candidate/Employer
    await yves.setLogin(log1);
    await emp1.setLogin(log2);

    //add city to employer/candidate
    await emp1.setCity(bruxelles);
    await yves.setCity(mons);

    //add employer to offer
    await offer1.setEmployer(emp1);

    //add city to offer
    await offer1.setCity(bruxelles);

    //add cetegory to offer
    await offer1.setCategoryJob(info);

    //add typeOffer to offer
    await offer1.setTypeOffer(cdi);

    //close the connection
    await sequelize.close();
})();
