import Modal from "../Modal";

import useImageModal from "@/hooks/useImageModal";
import Image from "next/image";


const ImageModal= () => {
  const imageModal = useImageModal();
  
  
  
  const bodyContent = (
    <div className="flex flex-col justify-center items-center">
     {imageModal?.path ? (
              <div className="bg-neutral-700  h-[480px] w-80 object-fill  md:min-h-[600px] md:min-w-[480px]  relative">
                {imageModal?.path && (
                  <Image
                    src={imageModal?.path}
                    fill
                    alt="Cover Image"
                    style={{ objectFit: "cover" }}
                  ></Image>
                )}
              </div>
            ) : null}
    </div>
  );


  return (
    <Modal
      isOpen={imageModal.isOpen}
      title=""
      actionLabel="Close"
      onClose={imageModal.onClose}
      body={bodyContent}
      onSubmit={()=>{}}
      isNotShow={true}
    />
  );
};


export default ImageModal;
