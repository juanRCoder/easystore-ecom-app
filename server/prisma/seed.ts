import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { prisma } from '../src/prisma'

async function main() {
  const categories = [
    { name: "Bebidas" },
    { name: "Snacks" },
    { name: "Dulces" },
  ];

  const categoryRecords = [];

  for (const category of categories) {
    const record = await prisma.categories.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    categoryRecords.push(record);
  }

  console.log("✅ Categorías base creadas correctamente");

  const products = [
    { name: "Coca-Cola", price: 1.5, categoryName: "Bebidas" },
    { name: "Pepsi", price: 1.5, categoryName: "Bebidas" },
    { name: "Fanta", price: 1.5, categoryName: "Bebidas" },
    { name: "Chips", price: 1, categoryName: "Snacks" },
    { name: "Pretzels", price: 2.5, categoryName: "Snacks" },
    { name: "Chocolate", price: 2, categoryName: "Dulces" },
    { name: "Pokeke", price: 1, categoryName: "Dulces" },
  ];

  for (const product of products) {
    const category = categoryRecords.find(
      (c) => c.name === product.categoryName
    );
    if (!category) continue;

    await prisma.products.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        price: product.price,
        status: "available",
        stock: 10,
        categoryId: category.id,
      },
    });
  }

  console.log("✅ Productos base creados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
