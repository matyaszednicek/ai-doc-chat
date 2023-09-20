import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function ChatNavBar({ name }: { name: string }) {
  return (
    <nav className="flex items-center justify-between w-full py-3  px-6 bg-[#D3D3D3] border-2 rounded-b-md  text-gray-950 custom-shadow">
      <Link href="/" className="hover:bg-[#b7b7b7] p-2 rounded-full transition-all duration-300">
        <ArrowUturnLeftIcon className="w-6 md:w-8" />
      </Link>
      <p className="text-sm font-bold truncate lg:text-lg">{name}</p>
      <div></div>
    </nav>
  );
}

export default ChatNavBar;
