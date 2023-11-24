import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

import Avatar from "./Avatar";
import Button from "./Button";
import PostImage from "./PostImage";


interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}



const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [typeID, setPostTypeId] = useState("0");
/*
  useEffect(() => {
    setImage(currentUser?.image);
    setPostTypeId(postTypeId)
  }, [currentUser , postTypeId]);
*/
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
    
      
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body, image , typeID });

      toast.success("Post created");
      setBody("");
      setImage("");
      setPostTypeId("0")
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, image, typeID]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-between">
              <div className="flex items-center gap-3">
                <PostImage onChange={(image) => setImage(image)}></PostImage>

                <select
                  onChange={(event) => setPostTypeId(event?.target.value)}     
                     
                  name="Visiblity"
                  id="vis"
                  className="rounded-xl px-2 py-1 text-xs text-neutral-300 bg-neutral-600"
                >
                  <option selected value={"0"}>Everyone</option>
                  <option value={"1"}>Followers</option>
                  <option value={"2"}>Subscribers</option>
                  <option value={"3"}>Post Sub</option>
                  <option value={"4"}>Registered</option>
                </select>
              </div>
             

              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Fanly3
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
