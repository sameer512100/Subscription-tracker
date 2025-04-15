const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err};
        error.message = err.message;
        console.error(error);

        //mongoose bad ObjectId
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 404);
        }

        //mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate field value entered: ${err.keyValue.name}`;
            error = new Error(message, 400);
        }

        //mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message, 400);
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Server Error',
        });
    }
    catch(error){
    next(error);
    }
};

export default errorMiddleware;