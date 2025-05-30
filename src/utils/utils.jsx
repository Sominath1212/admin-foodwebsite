import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
export const handleWarning = (msg) => {
  toast.warning(msg, {
    position: "top-right",
  });
};
export const handleInfo = (msg) => {
  toast.info(msg, {
    position: "top-right",
  });
};

// export const convertToBase64 = (file) => {
//   const base64 = "";
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     base64 = reader.result;
//   };
//   reader.onerror = (error) => {
//     console.error("Error converting file to Base64:", error);
//   };
//   return base64;
// };
