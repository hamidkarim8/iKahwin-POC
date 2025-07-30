import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function CredentialCard({ user, baseUrl, onEdit }) {
  const { auth } = usePage().props;
  const hasProfile = auth.hasProfile;

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
        {/* Personal Information */}
        <section>
          <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Username</div>
              <div className="font-medium text-gray-800 dark:text-white/90">
                {user?.name || "Not set"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Email Address</div>
              <div className="font-medium text-gray-800 dark:text-white/90">
                {user?.email || "Not set"}
              </div>
            </div>
          </div>
        </section>

        {/* Security Information */}
        <section>
          <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">
            Security
          </h4>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Password Security
                </h5>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Your password is securely stored and cannot be displayed. Use the edit button above to change your password.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account Status */}
        <section>
          <h4 className="font-semibold text-gray-700 dark:text-white/90 mb-2">
            Account Status
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hasProfile ? (
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h5 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Account Active
                  </h5>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your account is active and ready to use
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h5 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Not Ready
                  </h5>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Please fill in vendor information from the sidebar menu
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Secure Access
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your credentials are protected
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 