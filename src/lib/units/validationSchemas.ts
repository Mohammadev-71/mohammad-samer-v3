import * as z from "zod";


export const loginValidationSchema = z.object({
   email: z.string().email(),
   password: z
   .string()
   .min(8,"TOO_SMAL")
   .regex(/[A-Z]/,"UPPERCASE")
   .regex(/[0-9]/,"NUMBER")
   .regex(/[!@#$%&*_-]/,"SIGN")
})


export const addSkillValidationSchema = z.object({
   skill:z.string(),
   type: z.enum(['FRONTEND','BACKEND','DEVOPS','TOOLS','DATABASE'])
})


export const addProjectValidationSchema = z.object({
   title:z.string().min(5,"TITLE_TOO_SMAL").max(40,"TITLE_TOO_LONG"),
   description:z.string().min(10,"DESCRIPTION_TOO_SMAL").max(500,"DESCRIPTION_TOO_LONG"),
   img:z.string().min(1, "IMAGE_REQUIRED").url("INVALID_IMAGE_URL"),
   sourceLink:z.string().min(1, "IMAGE_REQUIRED").url("INVALID_IMAGE_URL").optional(),
   liveLink:z.string().min(1, "IMAGE_REQUIRED").url("INVALID_IMAGE_URL").optional(),
   skillsUsed:z.array(z.string()).min(1,"NO_SKILL_USED"),
   finishDate:z.string("FINISH_DATE_REQUIRED"),
   type:z.enum(['VANILLA','FRONTEND','BACKEND','FULLSTACK'])
})