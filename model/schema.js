const Candidate = require("./candidate");
const Role = require("./role");
const Employer = require("./employer");
const Offer = require("./offer");
const CategoryJob = require("./categoryJob");
const Login = require("./login");
const TypeOffer = require("./typeOffer");

//models associations
Role.hasMany(Candidate);
Role.hasMany(Employer);

Candidate.belongsTo(Role);
Employer.belongsTo(Role);

Offer.belongsTo(Employer);
Employer.hasMany(Offer);

CategoryJob.hasMany(Offer);
Offer.belongsTo(CategoryJob);

TypeOffer.hasMany(Offer);
Offer.belongsTo(TypeOffer);

Login.hasOne(Candidate);
Login.hasOne(Employer);
Employer.belongsTo(Login);
Candidate.belongsTo(Login);

module.exports = {
    Candidate,
    Role,
    Employer,
    Offer,
    CategoryJob,
    Login,
    TypeOffer,
};
