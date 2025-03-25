const router = require("express").Router();
const { User } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// Get current authenticated user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.getOne(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET the User record
router.get("/:id", async (req, res) => {
  console.log("looking for user", req.params.id);
  try {
    const userData = await User.getOne(req.params.id);

    if (!userData) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Create User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // Log the userData object to verify it contains the username field
    console.log("User Data:", userData);

    // Include the username in the token payload
    const token = signToken({
      id: userData.id,
      email: userData.email,
      username: userData.username, // Include the username
    });

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UDPATE the User record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Login User
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    // Log the userData to check that has the username
    console.log("User Data:", userData);

    // Add username in the token payload
    const token = signToken({
      id: userData.id,
      email: userData.email,
      username: userData.username, // Add the username
    });

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//Logout User
router.post("/logout", (_, res) => {
  res.status(204).end();
});

module.exports = router;
