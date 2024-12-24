const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    console.log('3');
    
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader);
    
    if (!authHeader?.startsWith('Bearer')) {
console.log('1');


        return res.status(401).json({ message: "Unauthorized" })
}
    console.log('2');

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded);

            if (err) {
                
                console.log(err);

                return res.status(403).json({ message: "forbidden" })
            }
            console.log("li");

            req.user = decoded
            console.log("hi");
            
            next()
        }
    )

}


module.exports = verifyJWT