const Airtime = require("../models/Airtime");

exports.getAirtime = async (req, res) => {
    try {
        const airtime = await Airtime.findAll();
        res.json(airtime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAirtimeByStaffId = async (req, res) => {
    try {
        const airtime = await Airtime.findAll({
            where: {
                EmployeeCode: req.params.id
            }
        });
        res.json(airtime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
