'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[20rem] py-10 px-8 my-auto bg-[#D3D3D3] border-2 rounded-md  text-gray-950 custom-shadow">
      <h1 className="mb-12 text-2xl font-bold ">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-11/12 h-full gap-6">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-sm placeholder:text-bold placeholder:text-gray-500 bg-gray-50 text-gray-950 custom-shadow focus:outline-0"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-sm placeholder:text-bold placeholder:text-gray-500 bg-gray-50 text-gray-950 custom-shadow focus:outline-0"
        />
        <button className="w-1/3 py-2 mt-4 font-medium transition-all rounded-sm bg-gray-50 text-gray-950 custom-shadow">
          Let&apos;s Go
        </button>
      </form>
      <Link href="/sign-up" className="font-medium mt-4 ">
        Sign Up
      </Link>
    </div>
  );
}
