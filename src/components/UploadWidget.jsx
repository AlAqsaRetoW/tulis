import { useEffect, useRef } from 'react';

const UploadWidget = ({ setImages }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dvkwdyyc7',
        uploadPreset: 'tulis-image',
      },
      function (error, result) {
        if (!error && result && result.event == 'success') {
          setImages(result.info.secure_url);
        }
        // Handle the result or error here
      }
    );
  }, []);

  return (
    <button
      type="button"
      className="bg-sky-700 text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={() => widgetRef.current.open()}
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
