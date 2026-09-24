import { prisma } from "./config/db.js";

const userId = process.env.ADMIN_ID;

const doctors = [
  {
    name: "Dr. James Anderson",
    age: 45,
    specialty: "Cardiologist",
    userId,
    image: "/doc1.jpeg",
    availableSlot: [
      {
        day: "Monday",
        times: ["9:00AM", "11:00AM", "2:00PM"],
      },
      {
        day: "Wednesday",
        times: ["9:00AM", "11:00AM", "2:00PM"],
      },
      {
        day: "Friday",
        times: ["9:00AM", "11:00AM", "2:00PM"],
      },
    ],
  },

  {
    name: "Dr. Sarah Williams",
    age: 38,
    specialty: "Dermatologist",
    userId,
    image: "/doc4.jpeg",
    availableSlot: [
      {
        day: "Tuesday",
        times: ["10:00AM", "1:00PM", "4:00PM"],
      },
      {
        day: "Thursday",
        times: ["10:00AM", "1:00PM", "4:00PM"],
      },
      {
        day: "Saturday",
        times: ["10:00AM", "1:00PM", "4:00PM"],
      },
    ],
  },

  {
    name: "Dr. Michael Brown",
    age: 52,
    specialty: "Neurologist",
    userId,
    image: "/doc2.jpeg",
    availableSlot: [
      {
        day: "Monday",
        times: ["8:00AM", "12:00PM", "3:00PM"],
      },
      {
        day: "Tuesday",
        times: ["8:00AM", "12:00PM", "3:00PM"],
      },
      {
        day: "Thursday",
        times: ["8:00AM", "12:00PM", "3:00PM"],
      },
    ],
  },

  {
    name: "Dr. Robert Davis",
    age: 41,
    specialty: "Pediatrician",
    userId,
    image: "/doc3.jpeg",
    availableSlot: [
      {
        day: "Wednesday",
        times: ["9:30AM", "12:30PM", "4:00PM"],
      },
      {
        day: "Friday",
        times: ["9:30AM", "12:30PM", "4:00PM"],
      },
      {
        day: "Saturday",
        times: ["9:30AM", "12:30PM", "4:00PM"],
      },
    ],
  },

  {
    name: "Dr. Daniel Wilson",
    age: 48,
    specialty: "Orthopedic Surgeon",
    userId,
    image: "/doc5.jpeg",
    availableSlot: [
      {
        day: "Monday",
        times: ["8:30AM", "11:30AM", "2:30PM"],
      },
      {
        day: "Wednesday",
        times: ["8:30AM", "11:30AM", "2:30PM"],
      },
      {
        day: "Thursday",
        times: ["8:30AM", "11:30AM", "2:30PM"],
      },
    ],
  },

  {
    name: "Dr. Martinez",
    age: 35,
    specialty: "Gynecologist",
    userId,
    image: "/doc6.jpeg",
    availableSlot: [
      {
        day: "Tuesday",
        times: ["9:00AM", "12:00PM", "3:30PM"],
      },
      {
        day: "Friday",
        times: ["9:00AM", "12:00PM", "3:30PM"],
      },
      {
        day: "Saturday",
        times: ["9:00AM", "12:00PM", "3:30PM"],
      },
    ],
  },
];

const seeding = async () => {
  console.log("seeding reached");

  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });

    console.log(doctor.name);
  }

  console.log("seeding completed");
};

seeding()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
