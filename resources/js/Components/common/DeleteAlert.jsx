import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function DeleteAlert({
  title = "Delete",
  routeName,
  resourceId,
}) {
  const swalOptions = {
    customClass: {
      container: "z-[999999]",
    },
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, confirm delete",
      ...swalOptions,
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(route(routeName, resourceId), {
          _method: 'DELETE',
        });
        
        // Show success message after a short delay
        setTimeout(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
            ...swalOptions,
          });
        }, 500);
      }
    });
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      {title}
    </button>
  );
}
