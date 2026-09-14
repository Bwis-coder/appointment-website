import { prisma } from "../config/db.js";

const doctorDetails = async (req, res) => {
  console.log("fetching doctor details");

  try {
    if (!req.user?.id) {
      return res.status(403).json({
        status: "error",
        message: "user not authorized",
      });
    }

    const doctorItems = await prisma.doctor.findMany();
    if (doctorItems.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No doctor items found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        doctorItems,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

export { doctorDetails };
