import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utility/generateToken.js";

const Register = async (req, res) => {
  console.log("registered user reached");
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        data: {
          status: "error",
          message: "user already have accout try loging in",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
      },
    });

    res.status(201).json({
      data: {
        status: "success",
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      data: {
        status: "error",
        message: "Internal server error.",
      },
    });
  }
};

const logIn = async (req, res) => {
  console.log("logIn request reached");

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user does not exist, register as a new user",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        status: "error",
        message: "incorrect password or email",
      });
    }

    generateToken(user.id, res);

    res.status(200).json({
      data: {
        status: "success",
        id: user.id,
        email,
      },
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      data: {
        status: "error",
        message: "Internal server error.",
      },
    });
  }
};

const logOut = (_, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      data: {
        status: "success",
        message: "you have successfully logout",
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      data: {
        status: "error",
        message: "Internal server error.",
      },
    });
  }
};

export { Register, logIn, logOut };
