import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { membersData } from "./membersData";

const prisma = new PrismaClient();

async function seedMembers() {
  // we're looping through the fake members array, and create a new user for each member
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash: await hash("password", 10),
        image: member.image,
        profileComplete: true,
        // we can create a member too here since it's related to user
        member: {
          create: {
            dateOfBirth: new Date(member.dateOfBirth),
            gender: member.gender,
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image, // represents the user main image, it's again for db
            // efficiency, we have the member main image without needing to look at
            // all the photos in the photo model
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    })
  );
}

async function seedAdmin() {
  await prisma.user.create({
    data: {
      email: "admin@test.com",
      emailVerified: new Date(),
      name: "Admin",
      passwordHash: await hash("password", 10),
      role: "ADMIN",
    },
  });
}

async function main() {
  await seedMembers();
  await seedAdmin();
}

// we'll just run this from node in the console, then it will seed all users into db
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
