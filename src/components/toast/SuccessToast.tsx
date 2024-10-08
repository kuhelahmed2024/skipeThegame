import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function SuccessToast({ message }: { message: string }) {
    toast.success(message, {
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