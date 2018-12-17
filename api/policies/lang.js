module.exports = function(req, res, next) {
   if (req.param('lang') !== undefined) {
        req.setLocale(req.param('lang'));
        req.session.selectlocale = req.param('lang');
        res.redirect(req.headers.referer);
        return;
    }
    
    if (req.session.selectlocale !== undefined) {
       
        req.setLocale(req.session.selectlocale);
       
        
    }
   
    next();
}