const db = require('../../dataBase').getInstance();
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
        const CommentModel = db.getModel('Comment');
		if (!CommentModel) throw new Error('Could not get CommentModel');

		const token = req.get('Authorization');
        if (!token) throw new Error('token should have come from headers');
        
        //verifying received token
		const { id: patient_id } = verify(token);

        // getting values from req.body
		const { doctor_id, comment } = req.body;
		if (!comment) throw new Error('could not get comment from req.body');
		if (!doctor_id) throw new Error('doctor id was absent during commenting');
        
        // adding comment to the table
		await CommentModel.create({
			patient_id,
			doctor_id,
			comment
		});
		
		res.status(200).json({
			success: true,
			msg: {answer: 'comment added'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};