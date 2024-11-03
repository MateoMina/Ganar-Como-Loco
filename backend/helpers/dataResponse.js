const response = async (res, {payload = null, msg = "", statusCode = 200, error = ""}) => {
    try{
        return res.json({
            payload,
            message: msg,
            error,
            status: statusCode
        });
    }
    catch(err){
        res.json({
            message: err,
            error: err,
            status: 500
        });
    }
}

module.exports = {
    response
}