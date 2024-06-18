const Staff = require("../models/Staff");
const {createToken} = require('../middlewares/jwtGenerationMiddleware');
const {createRefreshToken} = require('../middlewares/jwtGenerationMiddleware');

exports.login = async (req, res) => {
  const { Email, EmployeeCode } = req.body;

  if (!Email || !EmployeeCode) {
    return res.status(404).json({ message: "Input fields empty" });
  } else {
    //AD function


    //AD function ending
    try {
      const staff = await Staff.findOne({
        where: {
          Email: Email,
          EmployeeCode: EmployeeCode,
        },
      });

      if (staff) {
        
        const token = createToken(staff.EmployeeCode, staff.RoleID);
        const refreshToken = createRefreshToken(staff.EmployeeCode, staff.RoleID);
        if (token) {
          res.cookie("jwt", token, { httpOnly: true, maxAge: 1 * 60 * 1000 });
          res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 3 * 60 * 1000});
          console.log(token);
          res
            .status(200)
            .json({ message: "Login successful", employee: staff });
        } else {
          return res
            .status(500)
            .json({ message: "Server could not generate token" });
        }
      } else {
        return res.status(404).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
