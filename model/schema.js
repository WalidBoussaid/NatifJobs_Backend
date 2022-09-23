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
const Match = require("./match");
const Message = require("./message");
const Rdv = require("./rdv");
const Admin = require("./admin");
const Rgpd = require("./rgpd");

//models associations
Employer.hasMany(Match);
Offer.hasMany(Match);
Candidate.hasMany(Match);
Match.belongsTo(Offer);
Match.belongsTo(Employer);
Match.belongsTo(Candidate);

Employer.hasMany(Rdv);
Offer.hasMany(Rdv);
Candidate.hasMany(Rdv);
Rdv.belongsTo(Offer);
Rdv.belongsTo(Employer);
Rdv.belongsTo(Candidate);

Employer.hasMany(Message);
Match.hasMany(Message);
Candidate.hasMany(Message);
Message.belongsTo(Match);
Message.belongsTo(Employer);
Message.belongsTo(Candidate);

Role.hasMany(Candidate);
Role.hasMany(Employer);
Role.hasMany(Admin);

Candidate.belongsTo(Role);
Employer.belongsTo(Role);
Admin.belongsTo(Role);

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

Candidate.hasMany(HistoryEmployer);
HistoryEmployer.belongsTo(Candidate);

Candidate.hasMany(HistoryCandidate);
HistoryCandidate.belongsTo(Candidate);

Employer.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Employer);

Offer.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Offer);

Match.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Match);

Candidate.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Candidate);

Candidate.hasMany(NotificationCandidate);
NotificationCandidate.belongsTo(Candidate);

Offer.hasMany(NotificationCandidate);
NotificationCandidate.belongsTo(Offer);

Employer.hasMany(NotificationCandidate);
NotificationCandidate.belongsTo(Employer);

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
Login.hasOne(Admin);
Employer.belongsTo(Login);
Candidate.belongsTo(Login);
Admin.belongsTo(Login);

module.exports = {
    Candidate,
    Role,
    Employer,
    Offer,
    CategoryJob,
    Login,
    TypeOffer,
    City,
    HistoryCandidate,
    HistoryEmployer,
    NotificationCandidate,
    NotificationEmployer,
    Match,
    Message,
    Rdv,
    Admin,
    Rgpd,
};
