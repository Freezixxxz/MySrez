import "dotenv/config"; // Принудительно грузим .env
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma"; // Берем уже настроенный клиент!

async function main() {
  console.log("Начинаем заполнение базы данных...");

  // 1. Очищаем старые данные, чтобы не было конфликтов
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 2. Создаем тестового продавца
  const hashedPassword = await bcrypt.hash("123456", 10);
  const seller = await prisma.user.create({
    data: {
      username: "GabeNewell",
      email: "gabe@valve.com",
      password: hashedPassword,
      bio: "Продаю лучшие скины и ключи",
    },
  });
  console.log(`Создан тестовый продавец: ${seller.username}`);

  // 3. Подготавливаем новые товары с играми и привязкой к продавцу
  const products = [
    {
      title: "AWP | Dragon Lore (Factory New)",
      description: "Легендарный снайперский шедевр. Прямо с завода!",
      basePrice: 150000,
      discountPercent: 5,
      rating: 5.0,
      img: "/images/products/img-1.jpg",
      categories: ["Снайперские винтовки", "Тайное", "Скины"],
      game: "CS2",
      sellerId: seller.id,
    },
    {
      title: "Керамбит | Кровавая паутина",
      description:
        "Нож с лезвием в виде клыка тигра, покрытый кровавой паутиной.",
      basePrice: 85000,
      discountPercent: 0,
      rating: 4.8,
      img: "/images/products/img-2.jpg",
      categories: ["Ножи", "Тайное", "Скины"],
      game: "CS2",
      sellerId: seller.id,
    },
    {
      title: "Dragonclaw Hook",
      description: "Редкий хук на Pudge.",
      basePrice: 20000,
      discountPercent: 10,
      rating: 4.9,
      img: "/images/products/img-3.jpg",
      categories: ["Immortal", "Оружие"],
      game: "Dota 2",
      sellerId: seller.id,
    },
    {
      title: "Аккаунт Genshin Impact (59 ранг)",
      description: "Много лег, C6 Райдэн, Ху Тао. Полный доступ.",
      basePrice: 15000,
      discountPercent: 15,
      rating: 4.5,
      img: "/images/products/img-4.jpg",
      categories: ["Аккаунты", "Прокачка"],
      game: "Genshin Impact",
      sellerId: seller.id,
    },
    {
      title: "Ключ Cyberpunk 2077 (Steam)",
      description: "Лицензионный ключ для активации в Steam.",
      basePrice: 2000,
      discountPercent: 0,
      rating: 4.7,
      img: "/images/products/img-5.jpg",
      categories: ["Ключи", "RPG"],
      game: "Cyberpunk 2077",
      sellerId: seller.id,
    },
  ];

  // 4. Добавляем товары в базу
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Успешно добавлено ${products.length} товаров!`);
}

main()
  .catch((e) => {
    console.error("Ошибка при сидировании:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
