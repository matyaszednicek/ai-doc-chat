'use client';

import { useUploadStore } from '@/store/UploadStore';

function LoadingSpinner() {
  const { loading } = useUploadStore();
  return loading && <div className="absolute top-0 left-0 w-screen h-screen cursor-progress"></div>;
}

export default LoadingSpinner;
