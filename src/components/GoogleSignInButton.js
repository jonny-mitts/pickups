import Image from 'next/image';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = (props) => {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-4 rounded-lg pl-3 shadow-xl"
    >
      <Image alt="Use Google to Sign In!" src="/google-logo.png" height={30} width={30} />
      <span className="bg-blue-500 px-4 py-3 text-white">
        Sign in with Google
      </span>
    </button>
  )
}

GoogleSignInButton.displayName = 'GoogleSignInButton';

export default GoogleSignInButton;
