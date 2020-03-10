module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
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
            comment: {
				type: DataTypes.STRING,
                allowNull: false
            }
            
		},
		{
			tableName: 'comments',
			timestamps: false
		}
	);

    const Patient = sequelize.import('./Patient.js')
    const Doctor = sequelize.import('./Doctor.js')
    Comment.belongsTo(Patient, {foreignKey: 'patient_id'})
    Comment.belongsTo(Doctor, {foreignKey: 'doctor_id'})
	return Comment;
};