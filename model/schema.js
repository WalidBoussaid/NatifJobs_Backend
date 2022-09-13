const Candidate = require("./candidate");
const Role = require("./role");
const Employer = require("./employer");
const Offer = require("./offer");
const CategoryJob = require("./categoryJob");
const Login = require("./login");
const TypeOffer = require("./typeOffer");
const City = require("./city");
const NotificationCandidate = require("./notificationCandidate");
const NotificationEmployer = require("./notificationEmployer");
const HistoryCandidate = require("./historyCandidate");
const HistoryEmployer = require("./historyEmployer");

//models associations
Role.hasMany(Candidate);
Role.hasMany(Employer);

Candidate.belongsTo(Role);
Employer.belongsTo(Role);

Offer.belongsTo(Employer);
Employer.hasMany(Offer);

CategoryJob.hasMany(Offer);
Offer.belongsTo(CategoryJob);

Offer.hasMany(HistoryEmployer);
HistoryEmployer.belongsTo(Offer);

Offer.hasMany(HistoryCandidate);
HistoryCandidate.belongsTo(Offer);

Employer.hasMany(HistoryEmployer);
HistoryEmployer.belongsTo(Employer);

Candidate.hasMany(HistoryCandidate);
HistoryCandidate.belongsTo(Candidate);

Employer.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Employer);

Candidate.hasMany(NotificationCandidate);
NotificationCandidate.belongsTo(Candidate);

City.hasMany(Offer);
Offer.belongsTo(City);

City.hasMany(Employer);
City.hasMany(Candidate);
Employer.belongsTo(City);
Candidate.belongsTo(City);

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
    City,
};
