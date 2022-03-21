const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('planets', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false
		},
		mass: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
			
		},
		orbital_period: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
		discovered: {
			allowNull: true,
			type: DataTypes.INTEGER,
			unique: false
		},
		radius: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
		semi_major_axis: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
		star_distance: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
		temp: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
		method: {
			allowNull: true,
			type: DataTypes.STRING,
			unique: false
		},
		star_name: {
			allowNull: true,
			type: DataTypes.STRING,
			unique: false
		}
	});
};