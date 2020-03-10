module.exports = (sequelize, DataTypes) => {
	const Patient = sequelize.define(
		'Patient',
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
			password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            }
			
		},
		{
			tableName: 'patients',
			timestamps: false
		}
	);

	return Patient;
};