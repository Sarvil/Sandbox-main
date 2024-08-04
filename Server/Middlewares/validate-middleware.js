const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Details not filled properly";
        const extradetails = err.errors[0].message;
        const error = {
            status,
            message,
            extradetails
        };
        console.log(error);
        res.status(400).json(error);
        next(error);
    }
};


module.exports = validate;