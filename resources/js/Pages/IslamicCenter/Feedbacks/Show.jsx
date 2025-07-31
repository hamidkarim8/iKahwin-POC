import React from "react";
import { Link } from "@inertiajs/react";
import PageMeta from "@/Components/common/PageMeta";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import Carousel from "@/Components/common/Carousel";
import { formatDateDMY } from "@/Components/common/dateUtils";

export default function Show({ feedback, baseUrl }) {
  // Prepare images for carousel
  const images = (feedback.images || []).map((img, i) => ({
    src: img.image_path.startsWith("/storage")
      ? `${baseUrl}${img.image_path}`
      : `${baseUrl}/storage/${img.image_path}`,
    alt: `Feedback image ${i + 1}`,
  }));

  const renderStars = (stars) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 ${
              star <= stars
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-lg text-gray-700 dark:text-gray-200">
          {stars}/5 stars
        </span>
      </div>
    );
  };

  return (
    <div>
      <PageMeta
        title={`Feedback Review`}
        description="Feedback review details and preview"
      />
      <Link
        href={route("feedback.index")}
        className="inline-block mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
      >
        ← Back to Feedback Reviews
      </Link>
      <PageBreadcrumb pageTitle="Feedback Review Details" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:bg-gray-900 dark:border-gray-700">
        {/* Header & Status */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
            Customer Feedback
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                feedback.status === "display"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              {feedback.status === "display" ? "Display" : "Hidden"}
            </span>
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Date:{" "}
            <span className="font-semibold text-gray-700 dark:text-white">
              {feedback.created_at ? formatDateDMY(feedback.created_at) : "Unknown"}
            </span>
          </div>
        </div>

        {/* Content & Images Side by Side */}
        <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Feedback Details Card */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-700 px-6 py-6 relative">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="text-blue-500"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                  Customer Information
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                    Customer Details
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      {feedback.is_anonymous 
                        ? "Anonymous" 
                        : feedback.user_display_name || feedback.user?.name || "Unknown"
                      }
                    </div>
                    <div>
                      <span className="font-semibold">Anonymous:</span>{" "}
                      {feedback.is_anonymous ? "Yes" : "No"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                    Rating
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    {renderStars(feedback.stars)}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                    Comments
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    {feedback.comments ? (
                      <div className="whitespace-pre-line bg-gray-100 dark:bg-gray-900 p-3 rounded">
                        {feedback.comments}
                      </div>
                    ) : (
                      <span className="text-gray-400">No comments provided</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">
                    Additional Information
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
                    <div>
                      <span className="font-semibold">Submitted:</span>{" "}
                      {feedback.created_at ? formatDateDMY(feedback.created_at) : "Unknown"}
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        feedback.status === "display"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      }`}>
                        {feedback.status === "display" ? "Display" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-6 py-6">
              <h3 className="font-semibold mb-4 text-lg text-blue-700 dark:text-blue-300">
                Feedback Images
              </h3>
              {images.length > 0 ? (
                <Carousel images={images} />
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No images uploaded with this feedback.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 