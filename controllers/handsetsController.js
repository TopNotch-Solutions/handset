const Handsets = require("../models/Handsets");

exports.getHandsets = async (req, res) => {
    try {
      const handsets = await Handsets.findAll();
      res.json(handsets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };