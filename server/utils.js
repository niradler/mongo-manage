const ErrorHandlerHOC = cb => async (req,res) => {
    try {
       await cb(req,res);
    } catch (error) {
        console.log({error});
        res.status(500).json({error:error.message});
    }
}

module.exports = {
    ErrorHandlerHOC
}