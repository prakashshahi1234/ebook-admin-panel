"use client";
import GoogleLoginButton from "@/components/auth/google-login/googleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import {cn} from '@/utils/cn'
import {toast} from 'sonner'
function Login() {


  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: TAuthValidatorType) =>
      await Axios.post(`/login`, { email, password }),
  });

  type TAuthValidatorType = z.infer<typeof AuthCredentialIsvalidator>;

  const router = useRouter();
  const AuthCredentialIsvalidator = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAuthValidatorType>({
    resolver: zodResolver(AuthCredentialIsvalidator),
  });

  const onSubmit: SubmitHandler<TAuthValidatorType> = async (data , event) => {
    event?.preventDefault();
     
    loginMutation.mutate(data, {
      onSuccess: (result) => {
        localStorage.setItem("user", JSON.stringify(result.data.user));
        toast.success("Login Successfull.");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error("Login Failed" , {description:error?.response?.data?.message ||"Something went wrong.Please try again."});
      },
    });
  
  };
 
  return (
    <>
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className={cn('mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]' , {'pointer-envents-none':loginMutation.isPending})}>
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
          <Link className="text-blue-500" href="/register">
            Don&apos;t have an account? Register
          </Link>
        </div>

        <div >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className={cn('flex flex-col')}>
              <Label htmlFor="email" className=" text-muted-foreground mb-1 text-sm">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                {...register("email")}
                className={cn('h-10 px-3 border rounded focus:border-blue-400 transition duration-300', { 'border border-red-400': errors.email })}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div className={cn('flex flex-col')}>
              <Label htmlFor="password" className="text-muted-foreground mb-1 text-sm">
                Password
              </Label>
              <Input
                type="password"
                placeholder="hello123"
                {...register("password")}
                className={cn('h-10 px-3 border rounded focus:border-blue-400 transition duration-300', { 'border border-red-400': errors.password })}
              />
              {errors.password && (
                <small className="text-red-500">{errors.password.message}</small>
              )}
            </div>
            <div className="mt-6 flex flex-row justify-between items-center">
              <Button
                isLoading={loginMutation.isPending}
                type="submit"
                className={cn('w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700')}
              >
                {" "}
                Login
              </Button>
              <Link href="/forget-password" className="text-blue-500 hover:border-b-black"> Forget Password?</Link>
            </div>
          </form>
        </div>

        <div className="my-4 text-gray-500 text-sm flex items-center justify-center space-x-2">
          <hr className="flex-1 border-t border-gray-300" />
          <span>or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <GoogleOAuthProvider clientId="492087058595-lu60hdpe4oas6pdd8idrg1mju5kgmsd0.apps.googleusercontent.com">
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  </>
  );
}

export default Login;
