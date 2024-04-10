function auth(req, res, next){
    if (req.session?.user){
        return next()
    }
    else {
    return res.redirect('/api/sessions/login')
    }}


    export default auth