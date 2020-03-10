const db = require('../../dataBase').getInstance();
const Op = require('sequelize').Op;

module.exports = async (req, res) => {
	try {
		const DoctorModel = db.getModel('Doctor');
		if (!DoctorModel) throw new Error('Could not get DoctorModel');
		
		const {name} = req.query;
		
		// searching for doctors with name or lastName like the one from the query
        const arePresent = await DoctorModel.findAll({
			where: { [Op.or]: [
                { name: { [Op.startsWith]: name } },
                { lastName: { [Op.startsWith]: name } }
              ]},
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