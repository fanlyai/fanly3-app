import {create} from "zustand";

interface ImageModalStore {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
    path?: string
};

const useImageModal = create<ImageModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen:false}),
    path: "/images/placeholder.png",
}));

export default useImageModal;