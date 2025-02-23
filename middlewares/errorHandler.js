const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'server Error'

    res.json({
        error: true,
        statusCode: statusCode,
        message: message,
    })
}

module.exports = errorHandler