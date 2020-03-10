const db = require('../../dataBase').getInstance();
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		const AppreciationModel = db.getModel('Appreciation');
		if (!AppreciationModel) throw new Error('Could not get AppreciationModel');

		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting doctor_id and appreciation mark from req.body
		const { doctor_id, mark } = req.body;
		if (!doctor_id) throw new Error('doctor id was absent during appreciation');

        // verifying received token, getting patient id out of it
		const { id: patient_id } = verify(token);

		// check whether patient has appreciated this doctor ever before
		const appreciated = await AppreciationModel.findOne({
			where: {
				patient_id,
				doctor_id
			}
		});
		if(appreciated) throw new Error('you can not appreciate the same doctor twice');
        
        // if this patient have not appreciated this doctor before, Create new record in the table
		await AppreciationModel.create({
			patient_id,
			doctor_id,
			appreciation: mark
        });
        
		res.status(200).json({
			success: true,
			msg: { answer: 'appreciated' }
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
