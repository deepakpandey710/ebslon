const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../model/user");
const secret = process.env.SECRET;
const fs = require('fs');

exports.register = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(data.password, salt);
        let memberDetails = {
            password: pass,
            email: data.email,
            userName: data.userName
        }
        let userSchema = new user(memberDetails);
        await userSchema.save();
        return {
            success: true,
            message: "New user Registered",
            data: userSchema
        };
    } catch (error) {
        return {
            success: false,
            error: "Some error Occured"
        };
    }
}

exports.login = async (data) => {
    try {
        const userDetail = await user.findOne({ email: data.email });
        if (userDetail) {
            const isValid = await bcrypt.compare(data.password, userDetail.password);
            if (isValid) {
                const userObj = {
                    _id: userDetail._id,
                    email: userDetail.email,
                    userName: userDetail.userName,
                };
                const token = jwt.sign(userObj, secret);
                const res = await user.findOneAndUpdate({ email: data.email }, { $set: { loggedInStatus: true, token } }, { new: true })
                return {
                    success: true,
                    token: userDetail.token,
                    email: userDetail.email,
                    userName: res.userName
                };
            } else {
                return {
                    success: false,
                    message: "Incorrect Password",
                };
            }
        } else {
            return {
                success: false,
                message: "User does not exist"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: "Some error Occured"
        };
    }
};

exports.getProfile = async (email) => {
    try {
        const userDetail = await user.findOne({ email });
        if (userDetail) {
            return {
                success: false,
                data: userDetail,
            };
        } else {
            return {
                success: false,
                message: "User does not exist"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: "Some error Occured"
        };
    }
}

exports.updateProfilePicture = async (email, filePath) => {
    try {
        const res = await user.findOneAndUpdate({ email }, { $set: { profilePic: filePath } }, { new: true });
        return {
            success: true,
            message: 'Profile Picture Uploaded successfully',
            profilePic: res.profilePic
        }
    } catch (error) {
        return {
            success: false,
            error: "Some error Occured"
        };
    }
}
