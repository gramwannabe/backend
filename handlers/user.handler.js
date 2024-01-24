import { serviceGoogleApi } from "../configs/common.config.js";
import AppError from "../helpers/common.exception.js";
import { getValidateTokenData } from "../helpers/common.helper.js";
import { createUser, findUserByEmail, findUserByEmailAndPassword, getProfileDetail, updateProfile, updateProfilePicture } from "../models/user.model.js";
import { getUserGmailProfile } from "../services/gmail.js";

export async function register(req, res) {

    try {
        const { user_email, user_password, user_confirm_password } = req.body

        if (user_password !== user_confirm_password)
            throw new AppError(400, "Invalid password and confirm password")

        const user = await findUserByEmail(this.db_pool, { user_email })
        const user_name = user_email.split('@')[0]

        // user !== undefined
        if (user)
            throw new AppError(400, "user_email is not available")

        const _user = await createUser(this.db_pool, { user_email, user_name, user_password })
        return res.code(200).send({
            status_code: 200,
            message: 'User has been created successfully',
            content: {
                user: _user,
                ...req.body
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function login(req, res) {
    try {
        const { user_email, user_password } = req.body
        const user = await findUserByEmailAndPassword(this.db_pool, { user_email, user_password })

        // user === undefined
        if (!user)
            throw new AppError(400, "Invalid email or password")

        const token_response = await this.createToken(user)

        return res.code(200).send({
            status_code: 200,
            message: 'User logged succeed',
            content: {
                jwt: token_response.token,
                ...user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function updateProfileHandler(req, res) {
    try {
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const { user_fullname, user_bio_profile } = req.body
        const user = await updateProfile(this.db_pool, { user_fullname, user_bio_profile, user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'User Profile has been updated successfully',
            content: {
                user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getProfileMeHandler(req, res) {
    try {
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const user = await getProfileDetail(this.db_pool, { user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'User Profile has been retrieved successfully',
            content: {
                user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getUserProfileHandler(req, res) {
    try {
        const { user_id } = req.params
        const user = await getProfileDetail(this.db_pool, { user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'User Profile has been retrieved successfully',
            content: {
                user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function updateProfilePictureHandler(req, res) {
    try {
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const { user_profile_picture } = req.body
        const user = await updateProfilePicture(this.db_pool, { user_profile_picture, user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'User Profile Picture has been updated successfully',
            content: {
                user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function findUserByEmailHandler(req, res) {
    try {

        const { email } = req.query
        const user = await findUserByEmail(this.db_pool, { email })

        // user !== undefined
        if (user)
            throw new AppError(400, "user_email is not available")

        return res.code(200).send({
            status_code: 200,
            message: 'User Profile Picture has been updated successfully',
            content: {
                user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function loginWithGmailHandler(req, res) {
    try {
        const gmail_user = await getUserGmailProfile(req.headers.authorization.split(' ')[1])
        let user = await findUserByEmailAndPassword(this.db_pool, { user_email: gmail_user.email, user_password: gmail_user.id })
        if (!user)
            user = await createUser(this.db_pool, {
                user_email: gmail_user.email,
                user_name: gmail_user.email.split('@')[0],
                user_password: gmail_user.id
            })
        const token_response = await this.createToken(user)
        return res.code(200).send({
            status_code: 200,
            message: 'Login by gmail is succeed',
            content: {
                jwt: token_response.token,
                ...user
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}