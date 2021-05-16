const responseMiddleware = (req, res, next) => {
    if (res.data)
    {
        return res.status(200).json(res.data);
    }
    else if (res.err)
    {
        return res.status(404).json({ error: true, message: res.err.message });
    }
    next();
}

exports.responseMiddleware = responseMiddleware;