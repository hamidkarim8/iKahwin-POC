import { React, useState } from "react";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";
import DeleteAlert from "@/Components/common/DeleteAlert";
import { Link, router } from "@inertiajs/react";
import { formatDateDMY } from "@/Components/common/dateUtils";

export default function Index({ feedbacks, baseUrl }) {
  const handleStatusToggle = (feedback) => {
    const newStatus = feedback.status === 'display' ? 'no_display' : 'display';
    
    router.post(route('feedback.update', feedback.id), {
      status: newStatus
    });
  };

  const renderStars = (stars) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
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
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
          ({stars}/5)
        </span>
      </div>
    );
  };

  return (
    <div>
      <PageMeta title="Feedback Reviews" description="Manage customer feedback reviews" />
      <PageBreadcrumb pageTitle="Feedback Reviews" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            All Feedback Reviews
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Comments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white align-top">
                    <div className="flex items-center gap-2">
                      <Link
                        href={route("feedback.show", feedback.id)}
                        className="text-blue-600 hover:underline"
                      >
                        {feedback.is_anonymous 
                          ? "Anonymous" 
                          : feedback.user_display_name || feedback.user?.name || "Unknown"
                        }
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {renderStars(feedback.stars)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 align-top">
                    <div className="max-w-xs">
                      {feedback.comments ? (
                        <div className="line-clamp-2">
                          {feedback.comments.length > 100
                            ? `${feedback.comments.substring(0, 100)}...`
                            : feedback.comments}
                        </div>
                      ) : (
                        <span className="text-gray-400">No comments</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {feedback.images && feedback.images.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {feedback.images.length} {feedback.images.length === 1 ? 'image' : 'images'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">No images</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 align-top">
                    {feedback.created_at ? formatDateDMY(feedback.created_at) : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        feedback.status === "display"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {feedback.status === "display" ? "Display" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white align-top">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleStatusToggle(feedback)}
                        className={`text-sm px-3 py-1 rounded ${
                          feedback.status === "display"
                            ? "text-orange-600 hover:text-orange-800"
                            : "text-green-600 hover:text-green-800"
                        }`}
                      >
                        {feedback.status === "display" ? "Hide" : "Display"}
                      </button>
                      <DeleteAlert
                        routeName="feedback.destroy"
                        resourceId={feedback.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No feedback reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 