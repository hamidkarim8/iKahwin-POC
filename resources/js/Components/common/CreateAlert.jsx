import Swal from "sweetalert2";

export function showCreateAlert(item = "item") {
  Swal.fire({
    title: `Created!`,
    text: `${capitalize(item)} has been created.`,
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