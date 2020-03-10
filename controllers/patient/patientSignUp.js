const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
	try {
		const PatientModel = db.getModel('Patient');
		if (!PatientModel) throw new Error('Could not get PatientModel');

		const { name, lastName, email, password, passwordConfirm, gender} = req.body;

		// validation of input
		if (!name || !lastName || !email || !password || !gender)
			throw new Error('required field was missed during the registration');
		if (password.length < 1)
			throw new Error('sorry the length of the password should be at least 8 characters');
		if (passwordConfirm !== password)
			throw new Error('could not confirm the password try again');
		
		// creating a patient
		await PatientModel.create({
			name,
			lastName,
			email,
			password,
			gender
		});
		
		res.status(200).json({
			success: true,
			msg: {answer: 'patient has been created'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};