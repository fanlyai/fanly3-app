import useCurrentUser from "@/hooks/useCurrentUser";

import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import logo from "../../public/images/toncoinlogo.png"

import useCreditModal from "@/hooks/useCreditModal";
import Image from "next/image";

const CreditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const creditModal = useCreditModal();

  const [addcredit, setAddCredit] = useState(0.00);
  
  const price = (value: Number) => {
    const total = Number(value) * 2;
    return total;
  };

  useEffect(() => {
    setAddCredit(0);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const credit = addcredit + currentUser?.credit;

      await axios.patch(`/api/users/credit/${currentUser.id}`, {
        credit,
      });
      mutateFetchedUser();

      toast.success("Balance updated");

      creditModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [creditModal, addcredit, mutateFetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-white text-2xl">
        Your Balance: {currentUser?.credit}{" "}
        <span className="text-sky-500">fanly</span>3 credits
      </div>

      <Input
      type="Number"
        placeholder="Enter Amount"
        onChange={(e) => setAddCredit(Number(e.target.value))}
        numberValue={addcredit}
        disabled={isLoading}
      ></Input>
      <div className="text-white p-4 bg-sky-500 rounded-xl items-center flex text-xl">
        Total Cost: {price(addcredit)} <span className="px-1"><Image alt="logo" src={logo} width={28}></Image></span> - {addcredit} credits
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={creditModal.isOpen}
      title="Buy Credits"
      actionLabel="Submit"
      onClose={creditModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default CreditModal;
