"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"



const FormSchema = z.object({
  email: z.string().email({
    message: "Invaild email address",
  }),
  password : z.string().min(8,{
    message:"Password must be at least 8 characters."
  }),
  })




export default function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [loading,setLoading] = useState<Boolean>(false);
  const [error,setError] = useState<string>("");
  const router = useRouter();


  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try{
      setLoading(true);
      const signInData = await signIn('credentials',{
        email:data.email,
        password:data.password,
        redirect:true
      });

      if(signInData?.error){
        setError("Invalid username or password");
        console.log(signInData.error)
      }else{
        router.push('/events')
      }
    }catch(e:any){
      console.error(e)
      setError("Something went wrong. Please try again.");
    }finally{
      setLoading(false);
    }

  }

  return (
    <>
    <Navbar />
    <div className="h-screen flex flex-col items-center bg-black justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4 p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-10 text-white">Login</h1>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe18" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="text-black bg-white" variant={'ghost'}>
{loading ? (
  <div className="flex items-center">
    <svg
      className="animate-spin h-5 w-5 mr-3 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Processing
  </div>
) : (
  "Login"
)}
</Button>
        </form>
        <FormDescription className="text-xl text-center">not a member? <Link href="/sign-up" className="text-blue-700 underline">Register</Link></FormDescription>
      </Form>
    </div>
    <Footer/>
  </>  
  )
}

