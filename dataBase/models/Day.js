module.exports = (sequelize, DataTypes) => {
	const Day = sequelize.define(
		'Day',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			day: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			tableName: 'days',
			timestamps: false
		}
	);

	return Day;
};