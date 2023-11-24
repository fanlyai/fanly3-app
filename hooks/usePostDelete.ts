import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { useCallback } from "react";

const usePostDelete = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const toggleDelete = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      request = () => axios.delete("/api/postdelete", { data: { postId } });

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Post deleted !");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, postId, mutateFetchedPosts, mutateFetchedPost]);

  return {
    toggleDelete,
  };
};

export default usePostDelete;
