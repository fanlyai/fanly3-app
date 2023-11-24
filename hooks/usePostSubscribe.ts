import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import usePost from "./usePost";

const usePostSubscribe = (postId: string, userId:string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const {data :fetchedPost} = usePost(postId)

  const loginModal = useLoginModal();

  const isSubscribing = useMemo(() => {
    const list = fetchedPost?.subscriberIds || [];

    return list.includes(userId);
  }, [fetchedPost, userId]);

  const toggleSubscribe = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isSubscribing) {
        request = () => axios.delete('/api/postsubscribe', { data: { postId } });
      } else {
        request = () => axios.post('/api/postsubscribe', { postId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Post Sub Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isSubscribing, userId,postId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isSubscribing,
    toggleSubscribe,
  }
}

export default usePostSubscribe;