const db = require('../../dataBase').getInstance();
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		const CommentModel = db.getModel('Comment');
		if (!CommentModel) throw new Error('Could not get CommentModel');
		
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		//verifying received token
		const { id } = verify(token);

		// getting comment_id && patient_id from the req.body
		const { comment_id, patient_id, comment } = req.body;
		if (!comment_id || !patient_id || !comment)
			throw new Error(
				'for updating the comment you need to specify comment, comment_id and patient_id, they should be numbers'
			);

		// we want to make sure that only the patient who has written the comment is updating it now, that's why we are approving the patient (id comes from verified token)
		if(id !== +patient_id) throw new Error("don't try to update the comment of another patient");

		// updating comment in the comment table
		await CommentModel.update(
			{ comment },
			{
				where: {
					id: comment_id,
					patient_id
				}
			}
		);

		res.status(200).json({
			success: true,
			msg: { answer: 'updated' }
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
