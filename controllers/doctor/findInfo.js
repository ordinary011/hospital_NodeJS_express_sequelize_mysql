const db = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
	try {
		const DayModel = db.getModel('Day');
		const DayToDoctorModel = db.getModel('DayToDoctor');
		const AppreciationModel = db.getModel('Appreciation');
		const CommentModel = db.getModel('Comment');
		const PatientModel = db.getModel('Patient');
		if(!DayModel || !DayToDoctorModel || !AppreciationModel || !CommentModel || !PatientModel) throw new Error('could not get one of the models in doctorFindInfo');
		
		// getting doctor's id from params
		const {id: doctor_id} = req.params
		
		// searching for labour days of the Doctor
        const arePresent = await DayToDoctorModel.findAll({
			attributes: [],
			where: {
				doctor_id
			},
			include: [
                {
					model: DayModel,
					attributes: ['day']
                }
			],
			order: [['day_id']]
		});

		// 1) creating array of business days. 2) pushing found days into the array
		const days = []
		if(arePresent.length > 0) arePresent.forEach(obj => days.push(obj.Day.day));
		else throw new Error('could not find labour days of the Doctor');


		// calculating average from appreciation
		const marksInfo = await AppreciationModel.findAll({
			where: {
				doctor_id,
			},
			attributes: [
				[Sequelize.fn('AVG', Sequelize.col('appreciation')), 'avgMark'],
				[Sequelize.fn('COUNT', Sequelize.col('appreciation')), 'markCount']
			]
		});
		// if there were no appreciations we need to set a default value to substitute null
		let {avgMark, markCount} = marksInfo[0].dataValues
		if(avgMark === null) avgMark = 0;


		// searching for all of the comments about the doctor
		const docComments = await CommentModel.findAll({
			where: {
				doctor_id,
			},
			include: [
                {
					model: PatientModel,
					attributes: ['id', 'name', 'lastName']
                }
			]
		})
		
		res.status(200).json({
			success: true,
			msg: {
				marks: {avgMark, markCount},
				days,
				docComments
			}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
