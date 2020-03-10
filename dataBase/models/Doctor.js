module.exports = (sequelize, DataTypes) => {
	const Doctor = sequelize.define(
		'Doctor',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			occupation: {
				type: DataTypes.STRING,
				allowNull: false
			},
			period_of_service: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			phone_number: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: {
						args: [6, 128],
						msg: "Email address must be between 6 and 128 characters in length"
					},
					isEmail: {
						msg: "Email address must be valid"
					}
				}
			},
			floor: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			office: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			unit_id: {
				type: DataTypes.INTEGER,
				foreignKey: true,
				allowNull: false
			},
		},
		{
			tableName: 'doctors',
			timestamps: false
		}
	);

	const Unit = sequelize.import('./Unit.js');
	Doctor.belongsTo(Unit, { foreignKey: 'unit_id' });
	return Doctor;
};
