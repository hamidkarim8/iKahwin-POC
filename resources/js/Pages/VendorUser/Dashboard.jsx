import VendorLayout from "@/Layouts/VendorLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

const capitalizeWords = (str) =>
  str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function Dashboard({
  auth,
}) {
  return (
    <VendorLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Hi {capitalizeWords(auth.user.name)} (Vendor)
        </h2>
      }
    >
      <Head title="Dashboard" />

    </VendorLayout>
  );
}
