import {prisma} from '../src/lib/prisma'
import { auth } from '@/src/lib/auth'

async function main() {
   const res = await auth.api.signUpEmail({
      body: {
         email: 'mohammadev71@gmail.com',
         password: "Mohammad1@",
         name: 'Mohammad',
      },
   })

   console.log('Seed user created successfully via Better Auth API:', res)
}


main()
   .catch((e) => {
      console.error(e)
      process.exit(1)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })