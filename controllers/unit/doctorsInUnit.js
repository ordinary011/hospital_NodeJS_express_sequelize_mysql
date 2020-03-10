const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
	try {
		const DoctorModel = db.getModel('Doctor');
		if (!DoctorModel) throw new Error('Could not get DoctorModel');

		// getting unit_id from req.params 2) searching for all the doctors in the current unit
        const {id} = req.params
        const arePresent = await DoctorModel.findAll({
            where: {
                unit_id: id
            }
		});
		
		res.status(200).json({
			success: true,
			msg: {doctors: arePresent}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};