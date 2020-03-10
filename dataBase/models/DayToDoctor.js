module.exports = (sequelize, DataTypes) => {
	const DayToDoctor = sequelize.define(
		'DayToDoctor',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			doctor_id: {
				type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            day_id: {
				type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            
		},
		{
			tableName: 'days_to_doctor',
			timestamps: false
		}
	);

    const Doctor = sequelize.import('./Doctor.js')
    const Day = sequelize.import('./Day.js')
    DayToDoctor.belongsTo(Doctor, {foreignKey: 'doctor_id'})
    DayToDoctor.belongsTo(Day, {foreignKey: 'day_id'})
	return DayToDoctor;
};