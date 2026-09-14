import { prisma } from "./config/db.js";

const userId = process.env.ADMIN_ID;

const doctors = [
  {
    name: "Dr. James Anderson",
    age: 45,
    specialty: "Cardiologist",
    userId,
    image: "/doc1.jpeg",
  },
  {
    name: "Dr. Sarah Williams",
    age: 38,
    specialty: "Dermatologist",
    userId,
    image: "/doc4.jpeg",
  },
  {
    name: "Dr. Michael Brown",
    age: 52,
    specialty: "Neurologist",
    userId,
    image: "/doc2.jpeg",
  },
  {
    name: "Dr. Robert Davis",
    age: 41,
    specialty: "Pediatrician",
    userId,
    image: "/doc3.jpeg",
  },
  {
    name: "Dr. Daniel Wilson",
    age: 48,
    specialty: "Orthopedic Surgeon",
    userId,
    image: "/doc5.jpeg",
  },
  {
    name: "Dr. Martinez",
    age: 35,
    specialty: "Gynecologist",
    userId,
    image: "/doc6.jpeg",
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
