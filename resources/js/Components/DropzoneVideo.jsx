import React, { useRef, useState } from "react";

export default function DropzoneVideoUpload({ data, setData, errors }) {
  const fileInputRef = useRef();
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("video/")) {
      alert("Please upload a valid video file.");
      return;
    }

    setData("video", file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeVideo = () => {
    setData("video", null);
    setVideoPreview(null);
  };

  return (
    <div>
      <label className="label">Upload Video (optional, max. 1)</label>
      <div
        onClick={handleClick}
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <p className="text-sm text-gray-500 dark:text-gray-200">
          Click to upload one video file (MP4, MOV, AVI)
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="video/*"
          className="hidden"
        />
      </div>

      {errors.video && (
        <div className="text-red-500 text-sm mt-1">{errors.video}</div>
      )}

      {videoPreview && (
        <div className="mt-4 relative">
          <video
            src={videoPreview}
            controls
            className="w-full max-h-64 rounded"
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
            title="Remove"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
