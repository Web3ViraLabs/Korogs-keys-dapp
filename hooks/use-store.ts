import { create } from "zustand";

export type ModalType = "login" | "nftDisplay";

type ModalData = {
  hash?: string;
};

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: { hash: "" },
  isOpen: false,
  onOpen: (type, data = { hash: "" }) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
