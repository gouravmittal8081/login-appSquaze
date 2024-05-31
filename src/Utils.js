
import { toast } from "react-toastify";

export const notifySuccess = (msg) =>
    toast.success(`${msg}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      closeButton: false
    });
  
  export const notifyError = (msg) =>
    toast.error(`${msg}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      closeButton: false
    });