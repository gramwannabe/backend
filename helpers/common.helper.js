export async function getValidateTokenData(headers, validateToken) {
    const { authorization } = headers
    const jwt = authorization.split(' ')[1]
    const validate_token_response = await validateToken(jwt)
    return validate_token_response.data
}