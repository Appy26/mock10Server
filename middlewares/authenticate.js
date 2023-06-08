const jwt = require('jsonwebtoken');


const authenticate = (req, res,next) => {
    let token = req.headers.authorization;
    try {
        jwt.verify(token, 'mock10', function (err, decoded) {
           
            if (err) { 
                res.send({ "msg": "enter password" })
            }
            else {
                next();
            }
        });
    } catch (error) {
        res.send({ "msg":error.message })
    }
}

module.exports = authenticate;