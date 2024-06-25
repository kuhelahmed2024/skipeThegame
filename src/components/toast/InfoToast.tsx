import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function InfoToast({ message }: { message: string }) {
    toast.info(message, {
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