'use client'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
export default function Home() {
   const session  = useSession()
   console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Button onClick={() => signIn()}>Sign in</Button>
    </main>
  );
}
