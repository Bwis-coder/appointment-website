import { prisma } from "../config/db.js";

const appointmentSlots = async (req, res) => {
  const { doctorId, day, time } = req.body;

  // Check that all required appointment details were provided
  if (!doctorId || !day || !time) {
    return res.status(400).json({
      status: "error",
      message: "something went wrong check inputs",
    });
  }

  if (day === "choose a day" || time === "choose time") {
    return res.status(400).json({
      status: "error",
      message: "Please select a day and time",
    });
  }

  try {
    // Find the logged-in user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    // If the user does not exist, reject the request
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "unauthorized user",
      });
    }

    // Check if this doctor, day and time already has an appointment
    const existingslot = await prisma.appointmentSlot.findUnique({
      where: {
        doctorId_day_time: {
          doctorId,
          day,
          time,
        },
      },
    });

    // No existing appointment for this doctor, day and time
    // So create a new booked appointment
    if (!existingslot) {
      const createslot = await prisma.appointmentSlot.create({
        data: {
          status: "BOOKED",
          userId: user.id,
          doctorId,
          day,
          time,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({
        status: "success",
        data: createslot,
      });
    }

    // The appointment exists but the 24-hour booking period has expired
    // So the current user can book this appointment again
    else if (
      existingslot.status === "BOOKED" &&
      new Date() >= existingslot.expiresAt
    ) {
      const updateSlot = await prisma.appointmentSlot.update({
        where: {
          id: existingslot.id,
        },
        data: {
          status: "BOOKED",
          userId: user.id,
          doctorId,
          day,
          time,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({
        status: "success",
        data: updateSlot,
      });
    }

    // The slot exists and is available
    // So book it for the current user
    else if (existingslot.status === "AVAILABLE") {
      const updateSlot = await prisma.appointmentSlot.update({
        where: {
          id: existingslot.id,
        },
        data: {
          status: "BOOKED",
          userId: user.id,
          doctorId,
          day,
          time,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({
        status: "success",
        data: updateSlot,
      });
    }

    // The appointment is already booked and the 24-hour period
    // has not expired yet, so another user cannot book it
    else if (
      existingslot.status === "BOOKED" &&
      new Date() < existingslot.expiresAt
    ) {
      return res.status(409).json({
        status: "error",
        message: "This appointment is already booked. Please wait 24 hours.",
      });
    }

    // check if it cancelled and booked it again
    else if (existingslot.status === "CANCELLED") {
      const updateSlot = await prisma.appointmentSlot.update({
        where: {
          id: existingslot.id,
        },
        data: {
          status: "BOOKED",
          userId: user.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({
        status: "success",
        message: "you can book appointment now",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

const appointmentHistory = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "user not authorized",
      });
    }

    const findAppointment = await prisma.appointmentSlot.findMany({
      where: {
        userId: user.id,
        status: {
          in: ["BOOKED", "CANCELLED"],
        },
      },
      include: {
        doctor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (findAppointment.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "book appointment to view history",
      });
    }

    return res.status(200).json({
      status: "success",
      data: findAppointment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "user not authorized",
      });
    }

    const existingAppointment = await prisma.appointmentSlot.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingAppointment) {
      return res.status(400).json({
        status: "error",
        message: "appointment not found",
      });
    }

    const updateApp = await prisma.appointmentSlot.update({
      where: {
        id: existingAppointment.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    return res.status(200).json({
      status: "success",
      data: updateApp,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { appointmentSlots, appointmentHistory, cancelAppointment };
