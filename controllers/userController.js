const users = require("../models/userSchema");

exports.userregister = async (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname || !email || !password) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "This User Already exist in our DB" });
    } else {
      const userregister = new users({
        fname,
        email,
        password,
      });

      //password hasing
      const storeData = await userregister.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};
