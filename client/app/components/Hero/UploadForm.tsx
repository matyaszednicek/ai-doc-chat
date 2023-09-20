'use client';

import { useUploadStore } from '@/store/UploadStore';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

export default function UploadForm() {
  const router = useRouter();

  const { loading, setLoading } = useUploadStore();

  const docRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (loading) return;
    docRef?.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoading(true);

    if (e.target?.files) {
      const data = new FormData();
      data.append('file', e.target?.files![0]);

      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/documents/upload`, {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setLoading(false);
        return router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-col-1 w-full max-w-xs h-[148px] lg:h-[320px]">
      <input type="file" className="hidden" accept="application/pdf" ref={docRef} onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-full py-10 px-8 bg-[#D3D3D3] border-2 rounded-md text-gray-950 custom-shadow"
      >
        <DocumentPlusIcon className="w-10" />
      </button>
    </div>
  );
}
