const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extradetails = err.extradetails || "Error from Backend";

    return res.status(status).send(
        { 
            "message": message,
            "extradetails": extradetails 
        });
};

module.exports = errorMiddleware;