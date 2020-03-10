const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
	try {
		const UnitModel = db.getModel('Unit');
		if (!UnitModel) throw new Error('Could not get UnitModel');

		// searching for all the units in the hospital
        const allUnits = await UnitModel.findAll();

		res.status(200).json({
			success: true,
			msg: {units: allUnits}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};