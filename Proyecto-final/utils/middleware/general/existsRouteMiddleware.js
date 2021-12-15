const existsRouteMiddleware = (req,res,next)=>{
    res.status(404);

    if (req.accepts('json')) {
        res.json({ 
            error: -2, 
            description: `Ruta ${req.originalUrl} método ${req.method} no implementada`
        });
        return;
    }
}

module.exports = existsRouteMiddleware;