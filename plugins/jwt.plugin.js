import { jwtHost } from '../configs/common.config.js';
import fp from 'fastify-plugin';
import AppError from '../helpers/common.exception.js';

export default fp(async (app, options, done) => {

    app.decorate('getUserToken', (authorization) => {
        try {
            return authorization.split(' ')[1]    
        } catch (err) {
            throw new AppError(400, err.message)
        }
        
    })

    app.decorate('createToken', async (data) => {
        try {
            const response = await fetch(`${jwtHost}/token`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new AppError(400, `Error JWT status: ${response.status}`)

            return response.json()

        } catch (err) {
            throw new AppError(400, err.message)
        }
    });

    app.decorate('validateToken', async (token) => {
        
        try {
            const response = await fetch(`${jwtHost}/validate`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ token: token })
            })

            if (!response.ok) throw new AppError(`Error JWT Token invalid: ${response.status}`)

            return await response.json()

        } catch (err) {
            throw new AppError(400, err.message)
        }
    });

    app.decorate('refreshToken', async (token) => {
        
        try {
            const response = await fetch(`${jwtHost}/refresh`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ token: token })
            })

            if (!response.ok) throw new AppError(`Error JWT Token invalid: ${response.status}`)

            return await response.json()

        } catch (err) {
            throw new AppError(400, err.message)
        }
    });

    done()

});