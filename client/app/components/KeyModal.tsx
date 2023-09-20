'use client';

import { useKeyModalContext } from '@/context/ModalContext';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';

function KeyModal() {
  const { opened, setOpened } = useKeyModalContext();

  const { data: user, status } = useSession();

  const [key, setKey] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      const getKey = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/${user?.user?.uid}/key`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.user?.sessionToken}` },
        });

        return await res.json();
      };

      getKey()
        .then((res) => setKey(res.key))
        .catch((err) => console.log(err));
    }
  }, [status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/${user?.user?.uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.user?.sessionToken}` },
      body: JSON.stringify({
        openaiApiKey: key,
      }),
    });

    if (res.ok) setOpened(false);
  };

  return (
    opened &&
    status === 'authenticated' && (
      <Transition appear show={opened} as={Fragment}>
        <Dialog as="form" onSubmit={handleSubmit} className="relative z-10" onClose={() => setOpened(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center w-full max-w-[20rem] py-10 px-8 my-auto bg-[#D3D3D3] border-2 rounded-md  text-gray-950 custom-shadow">
                  <Dialog.Title as="h3" className="mb-8 text-2xl font-bold">
                    Your OpenAI API Key
                  </Dialog.Title>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="OpenAI API Key"
                    className="w-full px-3 py-2 rounded-sm placeholder:text-bold placeholder:text-gray-500 bg-gray-50 text-gray-950 custom-shadow focus:outline-0"
                  />

                  <button
                    type="submit"
                    className="w-1/3 py-2 mt-6 font-medium transition-all rounded-sm bg-gray-50 text-gray-950 custom-shadow"
                  >
                    Save
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  );
}

export default KeyModal;
