import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
    const authToken = request.headers.authorization

    if (!authToken) {

        return response.status(401).json({ error: 'Token not Provided' })
    }
    const token = authToken.split(' ')[1]

    try {
        const decoded = jwt.verify(token, authConfig.secret);

        request.userId = decoded.id
        request.userName = decoded.name
        return next();
    } catch (err) {
        return response.status(401).json({ error: 'Invalid token' });
    }
};