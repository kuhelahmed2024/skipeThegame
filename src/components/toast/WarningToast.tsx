import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function WarningToast({ message }: { message: string }) {
    toast.warning(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}