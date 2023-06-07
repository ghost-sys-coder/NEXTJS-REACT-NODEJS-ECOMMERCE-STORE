import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from 'next/font/google';
import Nav from "@/components/Nav";
import Logo from "./Logo";

const inter = Inter({ subsets: ['latin'] });

export default function Layout({children}) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (!session) {
    return (
      <main className={'bg-bgGray w-screen h-screen flex items-center'}>
        <div className='text-center w-full'>
          <button
            onClick={() => signIn('google')}
            className={'bg-white p-2 rounded-lg px-4'}>Login with Google</button>
        </div>
      </main>
    )
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center">
        <button className="p-4" onClick={() => setShowNav(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
        </button>
      
      <div className="flex grow justify-center mr-4 p-4">
        <Logo />
      </div>
      </div>

      <main className={'bg-bgGray min-h-screen flex'}>
      <Nav show={showNav} />
      <div className='bg-white flex-grow p-4'>
        {children}
      </div>
    </main>
    </div>
  )
  
}
