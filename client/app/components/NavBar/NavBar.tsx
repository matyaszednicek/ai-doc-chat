import KeyButton from './KeyButton';

function NavBar() {
  return (
    <nav className="flex items-center justify-between w-full py-3 mb-4 lg:mb-12 px-6 bg-[#D3D3D3] border-2 rounded-b-md  text-gray-950 custom-shadow">
      <p className="text-2xl font-bold">AI Doc Chat</p>
      <KeyButton />
    </nav>
  );
}

export default NavBar;
