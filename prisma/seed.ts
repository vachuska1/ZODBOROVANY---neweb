import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user if not exists
  const adminEmail = 'admin@example.com'
  const adminPassword = 'admin123' // Change this in production
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        password: await hash(adminPassword, 12),
        role: 'ADMIN',
      },
    })
    console.log('Created admin user')
  } else {
    console.log('Admin user already exists')
  }

  // Create sample articles if none exist
  const articleCount = await prisma.article.count()
  
  if (articleCount === 0) {
    const sampleArticles = [
      {
        title: 'Vítejte na našich nových stránkách',
        slug: 'vitejte-na-nasich-novych-strankach',
        content: 'Vážení členové a návštěvníci, vítáme vás na našich nových webových stránkách. Doufáme, že zde najdete všechny potřebné informace.',
        excerpt: 'Seznamte se s našimi novými webovými stránkami',
        author: 'Administrátor',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'Připravujeme letní sezónu 2024',
        slug: 'pripravujeme-letni-sezonu-2024',
        content: 'Letošní letní sezóna bude plná zajímavých akcí a novinek. Sledujte náš kalendář, ať vám nic neuteče.',
        excerpt: 'Přehled chystaných akcí na letní sezónu 2024',
        author: 'Vedení klubu',
        isPublished: true,
        publishedAt: new Date(),
      },
    ]

    for (const article of sampleArticles) {
      await prisma.article.create({
        data: article,
      })
    }

    console.log('Created sample articles')
  } else {
    console.log('Articles already exist, skipping sample data')
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
