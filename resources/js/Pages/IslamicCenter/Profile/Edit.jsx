import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import DropzoneImageEdit from "@/Components/DropzoneImageEdit";
import DropzoneVideoEdit from "@/Components/DropzoneVideoEdit";
import { showUpdateAlert } from "@/Components/common/UpdateAlert";

export default function EditProfileModal({ onClose, profile, role, baseUrl }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "POST",
    role: role,
    vendor_name: profile?.vendor_name || "",
    pic_name: profile?.pic_name || "",
    email: profile?.email || "",
    phone_number: profile?.phone_number || "",
    bank_account: profile?.bank_account || "",
    bank_name: profile?.bank_name || "",
    bio: profile?.bio || "",
    instagram_handle: profile?.instagram_handle || "",
    facebook_handle: profile?.facebook_handle || "",
    tiktok_handle: profile?.tiktok_handle || "",
    address_line: profile?.address_line || "",
    city: profile?.city || "",
    state: profile?.state || "",
    country: profile?.country || "",
    postcode: profile?.postcode || "",
    images: [],
    deleted_images: [],
    video: null,
    delete_video: false,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post(route("profile.store"), {
      onSuccess: () => {
        showUpdateAlert('profile');
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Vendor Name</label>
                <input
                  type="text"
                  value={data.vendor_name}
                  onChange={(e) => setData("vendor_name", e.target.value)}
                  className="input"
                  placeholder="Enter vendor name"
                />
                {errors.vendor_name && (
                  <div className="text-red-500 text-sm">{errors.vendor_name}</div>
                )}
              </div>

              <div>
                <label className="label">PIC Name</label>
                <input
                  type="text"
                  value={data.pic_name}
                  onChange={(e) => setData("pic_name", e.target.value)}
                  className="input"
                  placeholder="Enter person in charge name"
                />
                {errors.pic_name && (
                  <div className="text-red-500 text-sm">{errors.pic_name}</div>
                )}
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="input"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  value={data.phone_number}
                  onChange={(e) => setData("phone_number", e.target.value)}
                  className="input"
                  placeholder="+60 12-3456789"
                />
                {errors.phone_number && (
                  <div className="text-red-500 text-sm">{errors.phone_number}</div>
                )}
              </div>

              <div>
                <label className="label">Bank Account</label>
                <input
                  type="text"
                  value={data.bank_account}
                  onChange={(e) => setData("bank_account", e.target.value)}
                  className="input"
                  placeholder="Enter bank account number"
                />
                {errors.bank_account && (
                  <div className="text-red-500 text-sm">{errors.bank_account}</div>
                )}
              </div>

              <div>
                <label className="label">Bank Name</label>
                <input
                  type="text"
                  value={data.bank_name}
                  onChange={(e) => setData("bank_name", e.target.value)}
                  className="input"
                  placeholder="Enter bank name"
                />
                {errors.bank_name && (
                  <div className="text-red-500 text-sm">{errors.bank_name}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="label">Bio</label>
                <textarea
                  value={data.bio}
                  onChange={(e) => setData("bio", e.target.value)}
                  className="input"
                  rows="3"
                  placeholder="Enter your bio or description"
                />
                {errors.bio && (
                  <div className="text-red-500 text-sm">{errors.bio}</div>
                )}
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Social Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Instagram</label>
                <input
                  type="text"
                  value={data.instagram_handle}
                  onChange={(e) => setData("instagram_handle", e.target.value)}
                  className="input"
                  placeholder="@username"
                />
                {errors.instagram_handle && (
                  <div className="text-red-500 text-sm">{errors.instagram_handle}</div>
                )}
              </div>

              <div>
                <label className="label">Facebook</label>
                <input
                  type="text"
                  value={data.facebook_handle}
                  onChange={(e) => setData("facebook_handle", e.target.value)}
                  className="input"
                  placeholder="fb.com/username"
                />
                {errors.facebook_handle && (
                  <div className="text-red-500 text-sm">{errors.facebook_handle}</div>
                )}
              </div>

              <div>
                <label className="label">TikTok</label>
                <input
                  type="text"
                  value={data.tiktok_handle}
                  onChange={(e) => setData("tiktok_handle", e.target.value)}
                  className="input"
                  placeholder="@username"
                />
                {errors.tiktok_handle && (
                  <div className="text-red-500 text-sm">{errors.tiktok_handle}</div>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">Address Line</label>
                <input
                  type="text"
                  value={data.address_line}
                  onChange={(e) => setData("address_line", e.target.value)}
                  className="input"
                  placeholder="Enter your complete address"
                />
                {errors.address_line && (
                  <div className="text-red-500 text-sm">{errors.address_line}</div>
                )}
              </div>

              <div>
                <label className="label">City</label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => setData("city", e.target.value)}
                  className="input"
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <div className="text-red-500 text-sm">{errors.city}</div>
                )}
              </div>

              <div>
                <label className="label">State</label>
                <input
                  type="text"
                  value={data.state}
                  onChange={(e) => setData("state", e.target.value)}
                  className="input"
                  placeholder="Enter state name"
                />
                {errors.state && (
                  <div className="text-red-500 text-sm">{errors.state}</div>
                )}
              </div>

              <div>
                <label className="label">Country</label>
                <input
                  type="text"
                  value={data.country}
                  onChange={(e) => setData("country", e.target.value)}
                  className="input"
                  placeholder="Enter country name"
                />
                {errors.country && (
                  <div className="text-red-500 text-sm">{errors.country}</div>
                )}
              </div>

              <div>
                <label className="label">Postcode</label>
                <input
                  type="text"
                  value={data.postcode}
                  onChange={(e) => setData("postcode", e.target.value)}
                  className="input"
                  placeholder="Enter postcode"
                />
                {errors.postcode && (
                  <div className="text-red-500 text-sm">{errors.postcode}</div>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Gallery
            </h3>
            <div className="space-y-6">
              <div>
                <DropzoneImageEdit
                  data={data}
                  setData={setData}
                  errors={errors}
                  existingImages={profile?.images || []}
                  baseUrl={baseUrl}
                />
              </div>

              <div>
                <DropzoneVideoEdit
                  data={data}
                  setData={setData}
                  error={errors.video}
                  existingVideo={profile?.video}
                  baseUrl={baseUrl}
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-3 justify-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing || !acceptedTerms}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                acceptedTerms && !processing
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-500 cursor-not-allowed"
              }`}
            >
              {processing ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 