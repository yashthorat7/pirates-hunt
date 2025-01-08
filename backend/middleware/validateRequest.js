const validateShipNo = (req, res, next) => {
    const shipNo = parseInt(req.query.shipNo);
    if (isNaN(shipNo) || shipNo < 11 || shipNo > 50) {
        return res.status(400).json({ error: 'Invalid ship number' });
    }
    req.shipNo = shipNo;
    next();
};

module.exports = { validateShipNo }; 