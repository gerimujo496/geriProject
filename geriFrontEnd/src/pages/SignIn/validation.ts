import {z} from "zod"
 
export const schema = z.object({
   email: z.string().min(10, "Email is required").max(50, "Email should not be longer then 50").email(),
   password: z.string().min(8, "Password should be at minimum length of 8"),
  
 });