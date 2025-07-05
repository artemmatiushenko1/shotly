import GoogleIcon from '@/components/google-icon';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const SignInForm = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-sm">Enter your credentials to access your account</p>
      </div>
      <form>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="e.g email@example.com" />
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <Button className="w-full mb-8 font-bold" size="lg">
          Sign In
        </Button>
      </form>
      <div className="w-full h-[1px] bg-gray-200 relative mb-8">
        <div className="absolute text-sm left-1/2 bottom-1/2 leading-1 bg-background text-foreground size-8 translate-y-1/2 -translate-x-1/2 p-1 flex items-center justify-center">
          Or
        </div>
      </div>
      <Button variant="outline" className="w-full mb-8" size="lg">
        <GoogleIcon /> Sign In with Google
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="font-bold text-foreground">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export { SignInForm };
