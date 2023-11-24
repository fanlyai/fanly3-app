import {create} from "zustand";

interface CreditModalStore {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;

};

const useCreditModal = create<CreditModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen:false}),
}));

export default useCreditModal;