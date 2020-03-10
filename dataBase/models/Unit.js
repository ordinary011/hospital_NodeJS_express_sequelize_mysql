module.exports = (sequelize, DataTypes) => {
	const Unit = sequelize.define(
		'Unit',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unit: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			tableName: 'units',
			timestamps: false
		}
	);

	return Unit;
};