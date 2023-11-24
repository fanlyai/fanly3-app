import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillImageFill } from "react-icons/bs";

interface PostImageProps {
  onChange: (base64: string) => void;
  
  value?: string;
  disabled?: boolean;
}

const PostImage: React.FC<PostImageProps> = ({
  onChange,

  value,
  disabled,
}) => {
  const [base64, setBase64] = useState();
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          " cursor-pointer text-sm p-2 text-white text-center rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <BsFillImageFill size={15} className="hover:text-neutral-500" />
        </div>
      )}
    </div>
  );
};

export default PostImage;
