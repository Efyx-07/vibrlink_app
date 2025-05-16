'use client';

import SignupForm from './SignupForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <SignupForm />
        <LinkToLogin />
      </div>
    </div>
  );
}

function LinkToLogin() {
  return (
    <Link
      href="/vl/account/login"
      className="text-center text-sm font-light opacity-50 hover:text-accentColor hover:opacity-100"
    >
      Already have an account ? Sign in
    </Link>
  );
}
