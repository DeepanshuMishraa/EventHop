import {z} from "zod";


export const signUpSchema = z.object({
    username : z.string().min(3).max(255),
    email : z.string().email({
        message: "Invalid email address."
    }),
    password: z.string().min(6,{
        message: "Password length is too small"
    
    }).max(255,{
        message: "Password length is too large"
    })
})