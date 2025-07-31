import Swal from "sweetalert2";

export function showSupportSuccessAlert() {
  Swal.fire({
    title: "Support Request Submitted!",
    text: "Your support request has been submitted successfully. We will review it within 24 hours and respond via email.",
    icon: "success",
    confirmButtonText: "OK",
    customClass: {
      container: "z-[999999]",
    },
  });
}

export function showSupportErrorAlert(message = "Error submitting support request. Please check your input and try again.") {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
    customClass: {
      container: "z-[999999]",
    },
  });
} 