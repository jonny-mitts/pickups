'use client'

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <LoginForm />
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}


// import Link from 'next/link'

// import { Button } from '@/components/Button'
// import { TextField } from '@/components/Fields'
// import { Logo } from '@/components/Logo'
// import { SlimLayout } from '@/components/SlimLayout'
// import { useSession, signIn, signOut } from 'next-auth/react'


// // export const metadata = {
// //   title: 'Sign In',
// // }

// export default function Login() {
//   const { data: session } = useSession()
//   if (!session) {
//     return (
//       <>
        
        
//           <SlimLayout>
//             <div className="flex">
//               <Link href="/" aria-label="Home">
//                 <Logo className="h-10 w-auto" />
//               </Link>
//             </div>
//             <h2 className="mt-20 text-lg font-semibold text-gray-900">
//               Sign in to your account
//             </h2>
//             <Button
//                 href="/register"
//                 className="font-medium text-blue-600 hover:underline"
//                 onClick = {()=> signIn('google')}
//               >
//                 Sign In
//             </Button>{' '}
//             <p className="mt-2 text-sm text-gray-700">
//               Don’t have an account?{' '}
//               <Link
//                 href="/register"
//                 className="font-medium text-blue-600 hover:underline"
//               >
//                 Sign up
//               </Link>{' '}
//               for a free trial.
//             </p>
//             {/* <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
//               <TextField
//                 label="Email address"
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//               />
//               <TextField
//                 label="Password"
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//               />
//               <div>
//                 <Button
//                   type="submit"
//                   variant="solid"
//                   color="blue"
//                   className="w-full"
//                 >
//                   <span>
//                     Sign in <span aria-hidden="true">&rarr;</span>
//                   </span>
//                 </Button>
//               </div>
//             </form> */}
//           </SlimLayout>
        
        
//       </>
//     )
//   } else {
//     return (
//       <SlimLayout>
//         <div className="flex">
//           <Link href="/" aria-label="Home">
//             <Logo className="h-10 w-auto" />
//           </Link>
//         </div>
//         <h2 className="mt-20 text-lg font-semibold text-gray-900">
//           <h1>Eat shit and fuck off you wanker!</h1>
//         </h2>
//       </SlimLayout>
//     )
//   }
// }
