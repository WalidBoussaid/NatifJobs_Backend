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

//models associations
Employer.hasMany(Match);
Offer.hasMany(Match);
Candidate.hasMany(Match);
Match.belongsTo(Offer);
Match.belongsTo(Employer);
Match.belongsTo(Candidate);

Employer.hasMany(Message);
Match.hasMany(Message);
Candidate.hasMany(Message);
Message.belongsTo(Match);
Message.belongsTo(Employer);
Message.belongsTo(Candidate);

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

Candidate.hasMany(HistoryEmployer);
HistoryEmployer.belongsTo(Candidate);

Candidate.hasMany(HistoryCandidate);
HistoryCandidate.belongsTo(Candidate);

Employer.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Employer);

Offer.hasMany(NotificationEmployer);
NotificationEmployer.belongsTo(Offer);

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
    HistoryCandidate,
    HistoryEmployer,
    NotificationCandidate,
    NotificationEmployer,
};
