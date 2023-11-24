import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import useCreditModal from "./useCreditModal";

const useSubscribe = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();
  const creditModal = useCreditModal();

  const isSubscribing = useMemo(() => {
    const list = currentUser?.subscriberIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleSubscribe = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      const credit = currentUser.credit - fetchedUser.subscriberPrice;
      

      if (isSubscribing) {
        request = () => axios.delete("/api/subscribing", { data: { userId } });
      } else {
        console.log('---------------------- ' + credit)
        console.log('---------------------- currentUser' + currentUser.credit)
        console.log('---------------------- fetchedUser.subcriberPrice' + fetchedUser.subscriberPrice)
        
        if(credit <= 0 ){
          toast.error("Insufficient Balance");
         
          creditModal.onOpen();
          return

        }
        request = () => axios.post("/api/subscribing", { userId , credit });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isSubscribing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    isSubscribing,
    toggleSubscribe,
  };
};

export default useSubscribe;
