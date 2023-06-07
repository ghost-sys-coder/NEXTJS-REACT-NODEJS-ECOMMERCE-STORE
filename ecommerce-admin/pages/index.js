import Image from "next/image";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <h1>Hello, <b>{session?.user?.name}</b></h1>
        <div className="flex items-center rounded-lg overflow-hidden bg-gray-300 gap-1 text-black">
          <img
            className="w-10 h-10"
            src={session?.user?.image} 
            />
          <span className="py-1 px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}