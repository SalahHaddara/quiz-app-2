import jwt from 'jsonwebtoken';

export const autheticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(400).json({msg: 'Token is not valid'});
    }
}
