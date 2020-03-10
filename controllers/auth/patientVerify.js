const db = require('../../dataBase').getInstance();
const tokenVerify = require('../../helpers/tokenVerify')

module.exports = async (req, res) => {
    try {
		// getting token from headers
        const token = req.get('Authorization');
        if (!token) throw new Error('token should have come from headers');

		// verification
		const verifiedToken = await tokenVerify(token)

		res.status(200).json({
			success: true,
			msg: {verifiedToken}
		});
	} catch (e) {
		res.status(405).json({
			success: false,
			msg: e.message
		});
	}
}