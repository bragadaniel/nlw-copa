import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: faker.name.jobTitle(),
      code: faker.random.word().toUpperCase(),
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: faker.date.recent(),
      firstTeamCountryCode: faker.address.countryCode(),
      secondTeamCountryCode: faker.address.countryCode(),
    },
  });

  await prisma.game.create({
    data: {
      date: faker.date.recent(),
      firstTeamCountryCode: faker.address.countryCode(),
      secondTeamCountryCode: faker.address.countryCode(),

      guesses: {
        create: {
          firstTeamPoints: Number(faker.random.numeric()),
          secondTeamPoints: Number(faker.random.numeric()),
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
