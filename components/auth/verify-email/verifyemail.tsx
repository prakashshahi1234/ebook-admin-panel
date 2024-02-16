"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"



function VerifyEmail(){

    return(
        <div>
        <p  className="text-sm  text-red-500 my-3 text-center">Either the link is expired or invalid.Please try again.</p>
        <form>
        <div className='flex flex-col'>
              <Label htmlFor='password' className='mb-1 text-sm'>
                Email
              </Label>
              <Input
                type='password'
                id='password'
                placeholder='example@gmail.com'
                onChange={(e) => {}}
                required
                className='h-10 px-3 border rounded focus:border-blue-400 transition duration-300'
              />
              
            </div>
        </form>
        <Link href="/login">
          <Button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            send verification link{" "}
          </Button>
        </Link>
        </div>
    )
}

export default VerifyEmail;