import { prisma } from "../config/db.js";

const boookAppointmentslots = async (req, res) => {
  const { doctorId, day, time } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "unauthorized user",
    });
  }

  const defaultslot = await prisma.appointmentSlot.findFirst({
    where: {
      userId: user.id,
      doctorId,
      status: "AVAILABLE",
    },
  });

  if (defaultslot) {
    return await prisma.appointmentSlot.update({
      where: {
        id: defaultslot.id,
      },
      data: {
        doctorId,
        day,
        time,
        status: "BOOKED"
      }
    });
  }
};
