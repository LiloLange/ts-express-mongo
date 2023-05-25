import express, { Router, Request, Response } from "express";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import User from "../../models/User";
import { compareSync } from "bcryptjs";

const router: Router = express.Router();

// route: api/user/register
// description: user register
// method: POST and it's public
router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password length should be 6 to 40 characters").isLength({
      min: 6,
      max: 40,
    }),
    check("realname", "Realname must be required").notEmpty(),
    check("netkeyid", "NetKeyId is required").notEmpty(),
    check("pcpassword", "Your PC password is required").notEmpty(),
    check("birthday", "Birthday is required")
      .notEmpty()
      .isDate()
      .withMessage("Birthday is required")
      .withMessage("Invalid date type"),
    check("groupid", "Group ID is required").notEmpty().isNumeric(),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    let ip = req.ip || req.connection.remoteAddress;
    if (ip.startsWith("::ffff:")) {
      ip = ip.substr(7);
    }
    console.log(ip);

    user = new User({
      ...req.body,
      ip,
      role: "dev",
    });

    user.password = user.encryptPassword(user.password);

    await user.save();

    res.json({ msg: "Successfully registered" });
  }
);
// route: api/user/login
// description: user login and return jwt
// method: POST and it's public
router.post(
  "/login",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const compare = compareSync(password, user.password);
    if (!compare) {
      return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
    }

    let ip = req.ip || req.connection.remoteAddress;
    if (ip.startsWith("::ffff:")) {
      ip = ip.substr(7);
    }

    if (ip !== user.ip) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Not valid IP address for this user" }] });
    }
    return res.json("OK");
  }
);

export default router;
