import { ToastContainer, toast } from "react-toastify";

type SuccessMessageProps = {
  message: string;
};
export function SuccessMessage(props: SuccessMessageProps) {
  const { message } = props;
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function ErrorMessage(props: SuccessMessageProps) {
  const { message } = props;
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
