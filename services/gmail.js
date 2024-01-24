import { serviceGoogleApi } from "../configs/common.config.js";
import AppError from "../helpers/common.exception.js";

export async function getUserGmailProfile(gmailToken) {
    try {
        const response = await fetch(`${serviceGoogleApi}/oauth2/v1/userinfo?alt=json`, {
            headers: {
                "Authorization": `Bearer ${gmailToken}`
            },
            method: "GET",
        })

        if(!response.ok) throw new AppError(400, "Invalid Login by gmail ")

        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.error(error)
        throw new AppError(error.code !== undefined ? error.code : 500, error.message !== undefined ? `Gmail service error: ${error.message}`: error.message)
    }
}