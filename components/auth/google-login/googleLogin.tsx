'use client'
import { useGoogleLogin } from "@react-oauth/google";
import googleLogoImage from "@/assets/images/google-logo.png"; 
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import {toast} from 'sonner'
import { useRouter } from "next/navigation";


const GoogleLoginButton = () => {
  const router = useRouter()
  const registerMutation = useMutation({
    mutationFn: async (response:{access_token:string}) =>
      await Axios.post(`/google-auth`, {token:response.access_token}),
  });
  
  const login = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
        console.log(tokenResponse)
        registerMutation.mutate(tokenResponse,{
          onSuccess: () => {
            toast.success("Login Successfull.");
            router.push("/");
          },
          onError: (error: any) => {
            toast.error("Login Failed" , {description:error?.response?.data?.message ||"Something went wrong.Please try again."});
          },
        })
    },
  });
  
  return (
    <Button
    onClick={() => login()}
    className="flex items-center justify-start w-full md:w-auto text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow  focus:outline-none focus:ring focus:border-blue-200 md:space-x-2 bg-gray-100 hover:bg-gray-100"
  >
    <Image
      width={30}
      height={30}
      objectFit="contain"
      objectPosition="center"
      src={googleLogoImage}
      alt="Google Logo"
      className="mr-[40px]"
    />
    <span className="text-center">Continue with Google</span>
  </Button>
  
  
  
  
  
  );
};

export default GoogleLoginButton;
