const db = require('../../dataBase').getInstance();
const tokenSign = require('../../helpers/tokenSign');

module.exports = async (req, res) => {
	try {
        const UserModel = db.getModel('Patient');
        if (!UserModel) throw new Error('Could not get UserModel');

        const {email = '', password = ''} = req.body;
        if(!email || !password) throw new Error('email or password was not specified during logging in');

        // searching for a user in the database with the email and password, got from the req.body
        const isPresent = await UserModel.findOne({
            where: {
                email,
                password
            }
        });
        if(!isPresent) throw new Error('sorry wrong email or password');

        // signing id and name of the patient into the token 
        const {id, name} = isPresent;
        const token = tokenSign({id, name})

        res.status(200).json({
			success: true,
			msg: {token}
		});
	} catch (e) {
        console.log(e);
		res.status(400).json({
			success: false,
			msg: e.message
		});
    }
};