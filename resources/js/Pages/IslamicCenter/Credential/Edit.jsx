import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { showUpdateAlert } from "@/Components/common/UpdateAlert";

export default function EditCredentialModal({ onClose, user, baseUrl }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "POST",
    name: user?.name || "",
    email: user?.email || "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // Check if user is trying to change password
  const isChangingPassword = data.password && data.password_confirmation;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("credential.store"), {
      onSuccess: () => {
        showUpdateAlert("credential");
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Credentials
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Credential Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Credential Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Username</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="input"
                  placeholder="Enter your username"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="input"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Change Password
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">New Password</label>
                  <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="input"
                    placeholder="Enter new password"
                  />
                  {errors.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div>
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    className="input"
                    placeholder="Confirm new password"
                  />
                  {errors.password_confirmation && (
                    <div className="text-red-500 text-sm">
                      {errors.password_confirmation}
                    </div>
                  )}
                </div>
              </div>
              {isChangingPassword && (
                <div>
                  <label className="label">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={data.current_password}
                    onChange={(e) =>
                      setData("current_password", e.target.value)
                    }
                    className="input"
                    placeholder="Enter your current password"
                    required
                  />
                  {errors.current_password && (
                    <div className="text-red-500 text-sm">
                      {errors.current_password}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                !processing
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
