const db = require('../../dataBase').getInstance();
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
        const CommentModel = db.getModel('Comment');

		const token = req.get('Authorization');
        if (!token) throw new Error('token should have come from headers');
        
        //verifying received token, getting patient id our of it
		const { id } = verify(token);

        // getting comment id from the req.params
		const { comment_id, patient_id } = req.params
		if (!comment_id || !patient_id) throw new Error('for deleting the comment you need to specify both comment and patient id, they should be numbers');

		// we want to make sure that only the patient who has written the comment is deleting it now, that's why we are approving the patient (id comes from verified token)
		if(id !== +patient_id) throw new Error("don't try to delete the comment of another patient");
        
        // deleting comment from the comment table
		await CommentModel.destroy({
			where: {
				id: comment_id,
                patient_id
			}
        });

		res.status(200).json({
			success: true,
			msg: {answer: 'deleted'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};