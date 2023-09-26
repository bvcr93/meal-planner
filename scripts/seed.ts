const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Vegetarian foods",
        },
        {
          name: "Vegan foods",
        },
      ],
    });
  } catch (error) {
    console.error('error seeding categories')
  } finally {
    await db.$disconnect()
  }
}

main()


type Category = 'asd' | 'asd' 