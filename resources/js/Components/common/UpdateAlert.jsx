import Swal from "sweetalert2";

export function showUpdateAlert(item = "item") {
  Swal.fire({
    title: `Updated!`,
    text: `${capitalize(item)} has been updated.`,
    icon: "success",
    customClass: {
      container: "z-[999999]",
    },
  });
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
} 