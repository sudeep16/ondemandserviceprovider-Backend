const jwt = require("jsonwebtoken");
const User = require("./models/users");

module.exports.verifyUser = ((req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
        console.log(data);
    } catch (err) {
        throw new Error("Token could not be verified");
    }

    User.findById(data._id)
        .then((users) => {
            console.log(req.user);
            console.log(users);
            req.user = users;
            next();
        });
});