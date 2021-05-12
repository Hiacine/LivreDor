const { response } = require("express")

module.exports = (req,res,next) =>{

    if (req.session.flash) {
        res.locals.flash = req.session.flash
        req.session.flash = undefined
    }

    req.flash = (type,contenu) => {
        if(req.session.flash === undefined) {
            req.session.flash = {}
        }
        req.session.flash[type] = contenu
     }

    next()
}