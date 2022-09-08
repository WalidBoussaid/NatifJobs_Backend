//import connection with database
const connection = require('./connection');

//import methods to create model
const {Model,DataTypes} = require('sequelize');

class CategoryJob extends Model{}

CategoryJob.init({
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize : connection,
    modelName : "categoryJob",
}
)

module.exports = CategoryJob