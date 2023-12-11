const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    console.log(req.body)
    if (req.body.password === process.env.PASSWORD){
        const token = jwt.sign({
            userID: 1,
        }, process.env.SECRET);

        res.json({token})
    } else{
        res.status(401).send('Wrong password')
    }
    res.send('Hellow world')
}