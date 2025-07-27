import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

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

function GeneralInfoSection({ general }) {
  return (
    <section>
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">General Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Center Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.centerName}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">PIC Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.picName}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Email Address</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.email}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Phone Number</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.phone}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Bank Account</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.bankAccount}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Bank Name</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.bankName}</div>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs text-gray-500 mb-1">Bio</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{general.bio}</div>
        </div>
      </div>
    </section>
  );
}

function SocialMediaSection({ general, instagramSVG, facebookSVG, tiktokSVG }) {
  return (
    <section className="mt-6">
      <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Social Media</div>
      <div className="flex flex-col md:flex-row gap-3 mt-1">
        <SocialMediaLink svg={instagramSVG} label={general.social.ig} href="https://instagram.com/alhikmahcenter" />
        <SocialMediaLink svg={facebookSVG} label={general.social.fb} href="https://facebook.com/alhikmahcenter" />
        <SocialMediaLink svg={tiktokSVG} label={general.social.tiktok} href="https://tiktok.com/@alhikmahcenter" />
      </div>
    </section>
  );
}

function AddressSection({ address }) {
  return (
    <section>
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">Address Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <div className="text-xs text-gray-500 mb-1">Address line</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{address.line}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Postcode</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{address.postcode}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">State</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{address.state}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">City</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{address.city}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Country</div>
          <div className="font-medium text-gray-800 dark:text-white/90">{address.country}</div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section>
      <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">Gallery Information</h4>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">Image</div>
          <span className="text-xs text-gray-500">Profile Image</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">Video</div>
          <span className="text-xs text-gray-500">Intro Video</span>
        </div>
      </div>
    </section>
  );
}

export default function ProfileCard({ onEdit }) {
  // Dummy data
  const general = {
    centerName: "Al-Hikmah Center",
    picName: "Ustaz Ahmad",
    email: "ahmad@hikmah.com",
    phone: "+60 12-3456789",
    bankAccount: "1234567890",
    bankName: "Maybank",
    bio: "A center for Islamic learning.",
    social: {
      ig: "@alhikmahcenter",
      fb: "fb.com/alhikmahcenter",
      tiktok: "@alhikmahcenter",
    },
  };
  const address = {
    line: "123 Jalan Masjid",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    country: "Malaysia",
    postcode: "50000",
  };

  // SVGs from MetaCard
  const facebookSVG = (
    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6666 11.2503H13.7499L14.5833 7.91699H11.6666V6.25033C11.6666 5.39251 11.6666 4.58366 13.3333 4.58366H14.5833V1.78374C14.3118 1.7477 13.2858 1.66699 12.2023 1.66699C9.94025 1.66699 8.33325 3.04771 8.33325 5.58342V7.91699H5.83325V11.2503H8.33325V18.3337H11.6666V11.2503Z" fill="" />
    </svg>
  );
  const xSVG = (
    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1708 1.875H17.9274L11.9049 8.75833L18.9899 18.125H13.4424L9.09742 12.4442L4.12578 18.125H1.36745L7.80912 10.7625L1.01245 1.875H6.70078L10.6283 7.0675L15.1708 1.875ZM14.2033 16.475H15.7308L5.87078 3.43833H4.23162L14.2033 16.475Z" fill="" />
    </svg>
  );
  const instagramSVG = (
    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8567 1.66699C11.7946 1.66854 12.2698 1.67351 12.6805 1.68573L12.8422 1.69102C13.0291 1.69766 13.2134 1.70599 13.4357 1.71641C14.3224 1.75738 14.9273 1.89766 15.4586 2.10391C16.0078 2.31572 16.4717 2.60183 16.9349 3.06503C17.3974 3.52822 17.6836 3.99349 17.8961 4.54141C18.1016 5.07197 18.2419 5.67753 18.2836 6.56433C18.2935 6.78655 18.3015 6.97088 18.3081 7.15775L18.3133 7.31949C18.3255 7.73011 18.3311 8.20543 18.3328 9.1433L18.3335 9.76463C18.3336 9.84055 18.3336 9.91888 18.3336 9.99972L18.3335 10.2348L18.333 10.8562C18.3314 11.794 18.3265 12.2694 18.3142 12.68L18.3089 12.8417C18.3023 13.0286 18.294 13.213 18.2836 13.4351C18.2426 14.322 18.1016 14.9268 17.8961 15.458C17.6842 16.0074 17.3974 16.4713 16.9349 16.9345C16.4717 17.397 16.0057 17.6831 15.4586 17.8955C14.9273 18.1011 14.3224 18.2414 13.4357 18.2831C13.2134 18.293 13.0291 18.3011 12.8422 18.3076L12.6805 18.3128C12.2698 18.3251 11.7946 18.3306 10.8567 18.3324L10.2353 18.333C10.1594 18.333 10.0811 18.333 10.0002 18.333H9.76516L9.14375 18.3325C8.20591 18.331 7.7306 18.326 7.31997 18.3137L7.15824 18.3085C6.97136 18.3018 6.78703 18.2935 6.56481 18.2831C5.67801 18.2421 5.07384 18.1011 4.5419 17.8955C3.99328 17.6838 3.5287 17.397 3.06551 16.9345C2.60231 16.4713 2.3169 16.0053 2.1044 15.458C1.89815 14.9268 1.75856 14.322 1.7169 13.4351C1.707 13.213 1.69892 13.0286 1.69238 12.8417L1.68714 12.68C1.67495 12.2694 1.66939 11.794 1.66759 10.8562L1.66748 9.1433C1.66903 8.20543 1.67399 7.73011 1.68621 7.31949L1.69151 7.15775C1.69815 6.97088 1.70648 6.78655 1.7169 6.56433C1.75786 5.67683 1.89815 5.07266 2.1044 4.54141C2.3162 3.9928 2.60231 3.52822 3.06551 3.06503C3.5287 2.60183 3.99398 2.31641 4.5419 2.10391C5.07315 1.89766 5.67731 1.75808 6.56481 1.71641C6.78703 1.70652 6.97136 1.69844 7.15824 1.6919L7.31997 1.68666C7.7306 1.67446 8.20591 1.6689 9.14375 1.6671L10.8567 1.66699ZM10.0002 5.83308C7.69781 5.83308 5.83356 7.69935 5.83356 9.99972C5.83356 12.3021 7.69984 14.1664 10.0002 14.1664C12.3027 14.1664 14.1669 12.3001 14.1669 9.99972C14.1669 7.69732 12.3006 5.83308 10.0002 5.83308ZM10.0002 7.49974C11.381 7.49974 12.5002 8.61863 12.5002 9.99972C12.5002 11.3805 11.3813 12.4997 10.0002 12.4997C8.6195 12.4997 7.50023 11.3809 7.50023 9.99972C7.50023 8.61897 8.61908 7.49974 10.0002 7.49974ZM14.3752 4.58308C13.8008 4.58308 13.3336 5.04967 13.3336 5.62403C13.3336 6.19841 13.8002 6.66572 14.3752 6.66572C14.9496 6.66572 15.4169 6.19913 15.4169 5.62403C15.4169 5.04967 14.9488 4.58236 14.3752 4.58308Z" fill="" />
    </svg>
  );
  // TikTok SVG (custom)
  const tiktokSVG = (
    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 6.25c-1.034 0-2.016-.338-2.813-.91v6.16c0 2.623-2.127 4.75-4.75 4.75S5.187 14.123 5.187 11.5c0-2.623 2.127-4.75 4.75-4.75.207 0 .375.168.375.375v1.5a.375.375 0 01-.375.375A2.875 2.875 0 007.062 11.5a2.875 2.875 0 002.875 2.875 2.875 2.875 0 002.875-2.875V2.5c0-.207.168-.375.375-.375h1.5c.207 0 .375.168.375.375v.188c0 1.034.84 1.874 1.875 1.874.207 0 .375.168.375.375v1.438a.375.375 0 01-.375.375z" fill="" />
    </svg>
  );

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      {/* Edit button from MetaCard, top right */}
      <button
        onClick={onEdit}
        className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="" />
        </svg>
        Edit
      </button>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>
      <div className="space-y-10">
        <GeneralInfoSection general={general} />
        <SocialMediaSection general={general} instagramSVG={instagramSVG} facebookSVG={facebookSVG} tiktokSVG={tiktokSVG} />
        <hr className="border-t border-gray-200 dark:border-gray-700" />
        <AddressSection address={address} />
        <hr className="border-t border-gray-200 dark:border-gray-700" />
        <GallerySection />
      </div>
    </div>
  );
} 