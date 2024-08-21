export function errorHandler(error, req, res, next) {
    return res.status(error?.cause?.status ?? 500).json({
        status: "error",
        message: error?.message ?? "internal server error"
    })
}

