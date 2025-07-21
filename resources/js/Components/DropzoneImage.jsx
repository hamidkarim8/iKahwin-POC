import React, { useRef, useState } from "react";

export default function DropzoneImage({ data, setData, errors }) {
  const fileInputRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFiles = (files) => {
    const fileList = Array.from(files);

    // Remove duplicate files
    const existingKeys = data.images.map((f) => f.name + f.size);
    const newFiles = fileList.filter(
      (f) => !existingKeys.includes(f.name + f.size)
    );

    if (data.images.length + newFiles.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    setData("images", [...data.images, ...newFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...newFiles.map((f) => ({
        url: URL.createObjectURL(f),
        name: f.name,
      })),
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    if (e.target.files.length) handleFiles(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = (index) => {
    const updatedFiles = [...data.images];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setData("images", updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  return (
    <div>
      <label className="label">Upload Images (min. 1, max. 6)</label>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <p className="text-sm text-gray-500 dark:text-gray-200">
          Drag & drop or click to upload
        </p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleBrowse}
          accept="image/*"
          className="hidden"
        />
      </div>

      {errors.images && (
        <div className="text-red-500 text-sm mt-1">{errors.images}</div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-4">
        {imagePreviews.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.url}
              alt={`Preview ${index}`}
              className="w-full h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              title="Remove"
            >
              ✕
            </button>
            <p className="text-xs mt-1 text-center break-all dark:text-gray-300">
              {file.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
