export const requestRegisterSchema = {
    type: 'object',
    required: ['user_email', 'user_password', 'user_confirm_password'],
    additionalProperties: false,
    properties: {
        user_email: { type: 'string', format: 'email' },
        user_password: { type: 'string', minLength: 8 },
        user_confirm_password: { type: 'string', minLength: 8 }
    }
}

export const responseRegisterSchema = {
    200: {
        type: 'object',
        properties: {
            status_code: { type: 'number' },
            message: { type: 'string' },
            content: {
                type: 'object',
                properties: {
                    user_name: { type: 'string' },
                    user_email: { type: 'string' }
                }
            }
        }
    },
    400: {
        type: 'object',
        properties: {
            status_code: { type: 'number' },
            message: { type: 'string' }
        }
    }
}

export const requestLoginSchema = {
    type: 'object',
    required: ['user_email', 'user_password'],
    additionalProperties: false,
    properties: {
        user_email: { type: 'string', format: 'email' },
        user_password: { type: 'string', minLength: 8 }
    }
}

export const responseLoginSchema = {
    200: {
        type: 'object',
        required: ['status_code', 'content'],
        additionalProperties: false,
        properties: {
            status_code: { type: 'integer' },
            message: { type: 'string' },
            content: {
                type: 'object',
                required: ['user_id', 'user_email', 'created_at', 'jwt'],
                additionalProperties: false,
                properties: {
                    jwt: { type: 'string' },
                    user_id: { type: 'string', format: 'uuid' },
                    user_email: { type: 'string', format: 'email' },
                    created_at: { type: 'string', format: 'date-time' },
                    updated_at: { type: 'string', format: 'date-time' }
                },
            }
        }
    },
    400: {
        type: 'object',
        properties: {
            status_code: { type: 'number' },
            message: { type: 'string' }
        }
    }
}