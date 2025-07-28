import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react"; // Added missing import for React

function SocialInput({ svg, placeholder, value }) {
  return (
    <div className="flex items-center gap-2 border rounded-full px-3 py-2 bg-gray-50 dark:bg-gray-800 w-full max-w-xs">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        {svg}
      </span>
      <input
        className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white/90 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        readOnly
      />
    </div>
  );
}

function SocialMediaLink({ svg, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 transition"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full">
        {svg}
      </span>
      <span className="font-medium text-sm truncate">{label}</span>
    </a>
  );
}

function ImageModal({ isOpen, image, onClose }) {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-75" onClick={onClose}>
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full p-3 shadow-lg transition-colors duration-200 border border-gray-200 dark:border-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full h-full max-w-3xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center p-4">
          <img
            src={image}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

function GeneralInfoSection({ profile }) {
  return (
    <section>
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">
        General Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Vendor Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.vendor_name || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Email Address</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.email || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">PIC Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.pic_name || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Bank Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.bank_name || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Phone Number</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.phone_number || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Bank Account</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.bank_account || "Not set"}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs text-gray-500 mb-1">Bio</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.bio || "Not set"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialMediaSection({ profile, instagramSVG, facebookSVG, tiktokSVG }) {
  if (
    !profile?.instagram_handle &&
    !profile?.facebook_handle &&
    !profile?.tiktok_handle
  ) {
    return (
      <section className="mt-6">
        <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">
          Social Media
        </div>
        <div className="text-sm text-gray-500">
          No social media links added yet.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">
        Social Media
      </div>
      <div className="flex flex-col md:flex-row gap-3 mt-1">
        {profile?.instagram_handle && (
          <SocialMediaLink
            svg={instagramSVG}
            label={profile.instagram_handle}
            href={`https://instagram.com/${profile.instagram_handle.replace(
              "@",
              ""
            )}`}
          />
        )}
        {profile?.facebook_handle && (
          <SocialMediaLink
            svg={facebookSVG}
            label={profile.facebook_handle}
            href={`https://facebook.com/${profile.facebook_handle}`}
          />
        )}
        {profile?.tiktok_handle && (
          <SocialMediaLink
            svg={tiktokSVG}
            label={profile.tiktok_handle}
            href={`https://tiktok.com/@${profile.tiktok_handle.replace(
              "@",
              ""
            )}`}
          />
        )}
      </div>
    </section>
  );
}

function AddressSection({ profile }) {
  return (
    <section>
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">
        Address Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <div className="text-xs text-gray-500 mb-1">Address line</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.address_line || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Postcode</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.postcode || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">State</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.state || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">City</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.city || "Not set"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Country</div>
          <div className="font-medium text-gray-800 dark:text-white/90">
            {profile?.country || "Not set"}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ profile, baseUrl }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const hasImages = profile?.images && profile.images.length > 0;
  const hasVideo = profile?.video;

  // SVG placeholders
  const cameraSVG = (
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="mx-auto text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7h2l2-3h6l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
  const videoSVG = (
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="mx-auto text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <section className="mt-8">
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-4 text-base md:text-lg">
        Gallery
      </h4>
      {/* Images Grid */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Images
        </div>
        {hasImages ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {profile.images.map((img, idx) => (
              <div
                key={img.id || idx}
                className="aspect-square rounded-lg overflow-hidden shadow border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
              >
                <img
                  src={`${baseUrl}/storage/${img.image_path}`}
                  alt={`Image ${idx + 1}`}
                  className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(`${baseUrl}/storage/${img.image_path}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            {cameraSVG}
            <span className="text-xs text-gray-400 mt-2">No images</span>
          </div>
        )}
      </div>
      <hr className="my-4 border-t border-gray-200 dark:border-gray-700" />
      {/* Video */}
      <div className="mb-2">
        <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Video
        </div>
        {hasVideo ? (
          <div className="w-full max-w-md mx-auto">
            <video
              src={`${baseUrl}/storage/${profile.video.video_path}`}
              className="w-full h-64 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              controls
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            {videoSVG}
            <span className="text-xs text-gray-400 mt-2">No video</span>
          </div>
        )}
      </div>
      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <ImageModal
        isOpen={!!selectedVideo}
        image={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}

export default function ProfileCard({ profile, baseUrl, onEdit }) {
  const facebookSVG = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3333 10.0833C18.3333 5.41667 14.5833 1.66667 9.91667 1.66667C5.25 1.66667 1.5 5.41667 1.5 10.0833C1.5 14.3333 4.41667 17.8333 8.41667 18.5833V12.5833H6.41667V10.0833H8.41667V8.08333C8.41667 5.83333 9.58333 4.75 11.75 4.75C12.75 4.75 13.4167 4.91667 13.4167 4.91667V6.91667H12.25C11.0833 6.91667 10.75 7.58333 10.75 8.08333V10.0833H13.3333L12.9167 12.5833H10.75V18.5833C14.75 17.8333 17.6667 14.3333 17.6667 10.0833H18.3333Z"
        fill="currentColor"
      />
    </svg>
  );

  const xSVG = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 2.5H17.5L11.6667 8.75L18.3333 17.5H12.9167L9.16667 12.9167L5.41667 17.5H3.75L9.16667 10.8333L2.5 2.5H8.08333L11.25 6.66667L15.8333 2.5ZM14.5833 16.25H16.25L5.41667 4.16667H3.75L14.5833 16.25Z"
        fill="currentColor"
      />
    </svg>
  );

  const instagramSVG = (
    <svg
    className="fill-current"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8567 1.66699C11.7946 1.66854 12.2698 1.67351 12.6805 1.68573L12.8422 1.69102C13.0291 1.69766 13.2134 1.70599 13.4357 1.71641C14.3224 1.75738 14.9273 1.89766 15.4586 2.10391C16.0078 2.31572 16.4717 2.60183 16.9349 3.06503C17.3974 3.52822 17.6836 3.99349 17.8961 4.54141C18.1016 5.07197 18.2419 5.67753 18.2836 6.56433C18.2935 6.78655 18.3015 6.97088 18.3081 7.15775L18.3133 7.31949C18.3255 7.73011 18.3311 8.20543 18.3328 9.1433L18.3335 9.76463C18.3336 9.84055 18.3336 9.91888 18.3336 9.99972L18.3335 10.2348L18.333 10.8562C18.3314 11.794 18.3265 12.2694 18.3142 12.68L18.3089 12.8417C18.3023 13.0286 18.294 13.213 18.2836 13.4351C18.2426 14.322 18.1016 14.9268 17.8961 15.458C17.6842 16.0074 17.3974 16.4713 16.9349 16.9345C16.4717 17.397 16.0057 17.6831 15.4586 17.8955C14.9273 18.1011 14.3224 18.2414 13.4357 18.2831C13.2134 18.293 13.0291 18.3011 12.8422 18.3076L12.6805 18.3128C12.2698 18.3251 11.7946 18.3306 10.8567 18.3324L10.2353 18.333C10.1594 18.333 10.0811 18.333 10.0002 18.333H9.76516L9.14375 18.3325C8.20591 18.331 7.7306 18.326 7.31997 18.3137L7.15824 18.3085C6.97136 18.3018 6.78703 18.2935 6.56481 18.2831C5.67801 18.2421 5.07384 18.1011 4.5419 17.8955C3.99328 17.6838 3.5287 17.397 3.06551 16.9345C2.60231 16.4713 2.3169 16.0053 2.1044 15.458C1.89815 14.9268 1.75856 14.322 1.7169 13.4351C1.707 13.213 1.69892 13.0286 1.69238 12.8417L1.68714 12.68C1.67495 12.2694 1.66939 11.794 1.66759 10.8562L1.66748 9.1433C1.66903 8.20543 1.67399 7.73011 1.68621 7.31949L1.69151 7.15775C1.69815 6.97088 1.70648 6.78655 1.7169 6.56433C1.75786 5.67683 1.89815 5.07266 2.1044 4.54141C2.3162 3.9928 2.60231 3.52822 3.06551 3.06503C3.5287 2.60183 3.99398 2.31641 4.5419 2.10391C5.07315 1.89766 5.67731 1.75808 6.56481 1.71641C6.78703 1.70652 6.97136 1.69844 7.15824 1.6919L7.31997 1.68666C7.7306 1.67446 8.20591 1.6689 9.14375 1.6671L10.8567 1.66699ZM10.0002 5.83308C7.69781 5.83308 5.83356 7.69935 5.83356 9.99972C5.83356 12.3021 7.69984 14.1664 10.0002 14.1664C12.3027 14.1664 14.1669 12.3001 14.1669 9.99972C14.1669 7.69732 12.3006 5.83308 10.0002 5.83308ZM10.0002 7.49974C11.381 7.49974 12.5002 8.61863 12.5002 9.99972C12.5002 11.3805 11.3813 12.4997 10.0002 12.4997C8.6195 12.4997 7.50023 11.3809 7.50023 9.99972C7.50023 8.61897 8.61908 7.49974 10.0002 7.49974ZM14.3752 4.58308C13.8008 4.58308 13.3336 5.04967 13.3336 5.62403C13.3336 6.19841 13.8002 6.66572 14.3752 6.66572C14.9496 6.66572 15.4169 6.19913 15.4169 5.62403C15.4169 5.04967 14.9488 4.58236 14.3752 4.58308Z"
      fill=""
    />
  </svg>
  );

  const tiktokSVG = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 2v7.5a3.5 3.5 0 11-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="16" cy="5" r="1" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <button
        onClick={onEdit}
        className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
            fill=""
          />
        </svg>
        Edit Information
      </button>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Information Preview
      </h3>
      <div className="space-y-10">
        <GeneralInfoSection profile={profile} />
        <SocialMediaSection
          profile={profile}
          instagramSVG={instagramSVG}
          facebookSVG={facebookSVG}
          tiktokSVG={tiktokSVG}
        />
        <hr className="border-t border-gray-200 dark:border-gray-700" />
        <AddressSection profile={profile} />
        <hr className="border-t border-gray-200 dark:border-gray-700" />
        <GallerySection profile={profile} baseUrl={baseUrl} />
      </div>
    </div>
  );
}
