import Image from "next/image";

import useShowMedia from "@/hooks/useShowMedia";
import { useCallback } from "react";
import usePostSubscribe from "@/hooks/usePostSubscribe";

interface PostImageProps {
  postId: string;
  mediaId: string;
  fetchedUserId: string;
}

const PostImage: React.FC<PostImageProps> = ({
  postId,
  mediaId,
  fetchedUserId,
}) => {
  const { data: fetchedMedia } = useShowMedia(postId, mediaId);

  const {toggleSubscribe } = usePostSubscribe(
    postId,
    fetchedUserId
  );

  const postSubscribe = useCallback(
    (event: any) => {
      event.stopPropagation();

      toggleSubscribe();
    },
    [toggleSubscribe]
  );

  return (
    <div>
      {fetchedMedia?.path ?  <div className="bg-neutral-700 h-80 relative">
        { fetchedMedia?.path && fetchedMedia?.id !== "1" ? (
          <Image
            src={fetchedMedia?.path}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          ></Image>
        ) : (
          <Image
            src="/images/placeholder.png"
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
            onClick={postSubscribe}
          ></Image>
        )}
      </div> : null}
     
    </div>
  );
};

export default PostImage;
