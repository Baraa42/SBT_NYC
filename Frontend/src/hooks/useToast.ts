import toast from "react-hot-toast";

const defaultErrorMessage = "Something went wrong.";

const displayError = (error?: any) => {
  if (!error) return defaultErrorMessage;
  if (typeof error === "string") return error;
  const data = error.response?.data;
  if (data?.errors) return Object.values(data?.errors).join(" ");
  return data?.message || error.message || defaultErrorMessage;
};

export const useToast = (): {
  toastInfo: (message: string) => void;
  toastError: (error?: any) => void;
} => {
  return {
    toastInfo: (message: string) => toast(message, { className: "bg-primary" }),
    toastError: (error: any) => toast.error(displayError(error)),
  };
};
