import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";
import useLike from "@/hooks/useLike";
import PostImage from "./PostImage";
import usePost from "@/hooks/usePost";

import usePostDelete from "@/hooks/usePostDelete";
import useImageModal from "@/hooks/useImageModal";
import useShowMedia from "@/hooks/useShowMedia";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
  postId: string;
  mediaId?: string;
}

const PostItem: React.FC<PostItemProps> = ({
  data = {},
  userId,
  postId,
  mediaId,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const imageModal = useImageModal();
  const { data: fetchedPost } = usePost(postId);
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const { toggleDelete } = usePostDelete({ postId: data.id, userId });

 
  const { data: showMedia } = useShowMedia(data.id, data.mediaId, userId);


  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const onDelete = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleDelete();
    },
    [loginModal, currentUser]
  );

  const goToImage = useCallback(
    (event: any) => {
      event.stopPropagation();
     
      imageModal.path = showMedia?.path;
      return imageModal.onOpen();
    },
    [imageModal,showMedia]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <>
      <div
        onClick={goToPost}
        className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
      >
        <div className="flex flex-row  items-start gap-3">
          <Avatar userId={data.user.id} />
          <div>
            <div className="flex justify-between items-center gap-2  sm:gap-8 md:gap-36 ">
              <div className="flex flex-row items-center gap-2">
                <p
                  onClick={goToUser}
                  className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
                md:text-base
                text-sm
            "
                >
                  {data.user.name}
                </p>
                <span
                  onClick={goToUser}
                  className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
                >
                  @{data.user.username}
                </span>
                <span className="text-neutral-500 text-xs md:text-sm">
                  {createdAt}
                </span>
              </div>
              {data.userId === currentUser?.id ? (
                <div className="text-white relative  flex  " onClick={onDelete}>
                  <AiOutlineClose className="text-neutral-500" size={20} />
                </div>
              ) : null}
            </div>
            <div className="text-white mt-1 pr-8 overflow-hidden break-all">{data.body}</div>
            <div className="pt-4" onClick={goToImage}>
              {data.mediaId !== "" ? (
                <PostImage fetchedUserId={data.userId} mediaId={data.mediaId} postId={data.id}/>
              ) : null}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            "
              >
                <AiOutlineMessage size={20} />
                <p>{data.comments?.length || 0}</p>
              </div>
              <div
                onClick={onLike}
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
              >
                <LikeIcon color={hasLiked ? "red" : ""} size={20} />
                <p>{data.likedIds.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
