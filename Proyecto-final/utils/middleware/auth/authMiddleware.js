
const adminMiddleware = (req,res,next)=>{
    let isAdmin = req.headers['x-admin'] || 'false';

    if(isAdmin === 'false'){
        return res.status(403).json({
            error:-1,
            description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`
        });
    }else{
        next();
    }
}

module.exports = adminMiddleware;