//import connection with database
const connection = require('./connection');

//import method to create model
const {Model,DataTypes} = require('sequelize');

//create a model
class Candidate extends Model {}

Candidate.init({
    firstName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    lastName :{
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    profilImg : {
        type : DataTypes.STRING,
        allowNull : false
    },
    nationality : {
        type : DataTypes.STRING,
        allowNull : false
    },
    adress :{
        type: DataTypes.STRING,
        allowNull : false
    },
    postalCode : {
        type : DataTypes.STRING,
        allowNull : false
    },
    dateOfBirth : {
        type : DataTypes.STRING,
        allowNull : false ,
    },
    lastDiplomaObtained : {
        type : DataTypes.STRING,
        allowNull : false
    },
    lastExperiencepro : {
        type : DataTypes.STRING,
        allowNull : false
    },
    hobbies : {
        type : DataTypes.STRING,
        allowNull : false
    },
    cv : {
        type : DataTypes.STRING,
        allowNull : false
    },
    //options
},
{
    sequelize: connection,
    modelName :"candidate"
}
)

module.exports = Candidate