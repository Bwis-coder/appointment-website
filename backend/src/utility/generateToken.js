import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const payload = { id: id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000 * 24 * 7,
  });

  return token;
};

export { generateToken };
