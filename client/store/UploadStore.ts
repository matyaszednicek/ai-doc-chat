import { create } from 'zustand';

interface UploadSlice {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUploadStore = create<UploadSlice>((set) => ({
  loading: false,
  setLoading: (loading) => set((state) => ({ loading })),
}));
