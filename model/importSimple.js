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
    Admin,
    Rgpd,
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
    const administrator = await Role.create({
        roleName: "admin",
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
        title: "Junior developer java",
        description:
            "En tant que Junior Java Developer, vous rejoignez une équipe dynamique organisée de façon Agile / Scrum : gestion d'un backlog, séances de poker planning, stand-up meetings quotidiens, découpe du travail en sprints de 2 à 3 semaines, réunions rétrospectives, Cette organisation permet à chaque membre de l’équipe de s’impliquer fortement dans le projet et de participer aux prises de décisions. Vous prenez part au développement de nouvelles applications en vous basant sur les standards de développement et les frameworks existants. A partir des documents d’analyses fonctionnelles rédigés par les analystes et des consignes techniques transmises par les architectes, vous assurez le développement, le testing et la documentation des applications développées. Vous êtes également responsable de la résolution de bugs liés au code et du développement de nouvelles fonctionnalités...",
    });

    //Login
    const log1 = await Login.create({
        mail: "nduwayezv@cactustore.com",
        password: "azerty",
    });
    const log2 = await Login.create({
        mail: "totosprl@gmail.com",
        password: "azerty",
    });
    const log3 = await Login.create({
        mail: "admin@gmail.com",
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

    //Admin
    const admin = await Admin.create({
        name: "Boussaid",
        firstName: "Walid",
    });

    //RGPD
    const rgpd = await Rgpd.create({
        text: `Mentions légales
        En vigueur au 01/09/2022
        
         
        Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l""Utilisateur", du site NatifJobs , ci-après le "Site", les présentes mentions légales.
        
        La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
        
        Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».
        
        ARTICLE 1 - L'EDITEUR
        
        L’édition et la direction de la publication de l’application mobile est assurée par Boussaid Walid, domiciliée Rue de trone, 156, dont le numéro de téléphone est 0487225631, et l'adresse e-mail natifJobs@hotmail.com.
         
        ci-après l'"Editeur".
        
        ARTICLE 2 - L'HEBERGEUR
        
        L'hébergeur de l’application mobile est la société Walid, dont le siège social est situé au Rue de trone, 156 , avec le numéro de téléphone : 0456784523 + adresse mail de contact
        
        ARTICLE 3 - ACCES AU SITE
        
        L’ application est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
        
        En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.
        
        ARTICLE 4 - COLLECTE DES DONNEES
        
        L’application assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. 
        
        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :
        ·         par mail à l'adresse email natifJobs@hotmail.com
         
        Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
        `,
    });

    //add role to Candidate/Employer
    await yves.setRole(candidate);
    await emp1.setRole(employer);
    await admin.setRole(administrator);

    //add login to Candidate/Employer
    await yves.setLogin(log1);
    await emp1.setLogin(log2);
    await admin.setLogin(log3);

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
