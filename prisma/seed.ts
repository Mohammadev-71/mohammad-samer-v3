import {prisma} from '../src/lib/prisma'


async function main() {
   await prisma.user.upsert({
      where: { email: 'mohammadev71@gmail.com' },
      update: {},
      create: {
         email: 'mohammadev71@gmail.com',
         name: 'Mohammad',
      },
   })

   console.log('Seed data created successfully')
}


main()
   .catch((e) => {
      console.error(e)
      process.exit(1)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })