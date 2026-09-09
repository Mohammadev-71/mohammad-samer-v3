import { betterAuth } from "better-auth";

export const auth = betterAuth({
   advanced: {
      database: {
         joins: true,
      },
   },
});