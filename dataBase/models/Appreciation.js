module.exports = (sequelize, DataTypes) => {
	const Appreciation = sequelize.define(
		'Appreciation',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			patient_id: {
				type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            doctor_id: {
				type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            appreciation: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5
				}
            }
            
		},
		{
			tableName: 'appreciation',
			timestamps: false
		}
	);

    const Patient = sequelize.import('./Patient.js')
    const Doctor = sequelize.import('./Doctor.js')
    Appreciation.belongsTo(Patient, {foreignKey: 'patient_id'})
    Appreciation.belongsTo(Doctor, {foreignKey: 'doctor_id'})
	return Appreciation;
};