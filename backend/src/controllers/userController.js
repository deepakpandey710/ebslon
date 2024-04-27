const userDb = require("../db/userDb");
// const uploadDirPath = process.env.UPLOAD_DIR_PATH;

exports.register = async (req, res) => {
    try {
        const data = req.body;
        const response = await userDb.register(data);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ err: 'some error occured' });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).json({ error: 'Email and password is required' });
        }
        const response = await userDb.login(data);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ err: 'some error occured' });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { email } = req.data;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const response = await userDb.getProfile(email);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ err: 'some error occured' });
    }
}

exports.uploadProfilePic = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // const picPath=uploadDirPath+req.file.filename;
        const picPath=req.file.path;
        const response = await userDb.updateProfilePicture(email, picPath);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ err: 'some error occured' });
        console.error('login error', err);
    }
}
