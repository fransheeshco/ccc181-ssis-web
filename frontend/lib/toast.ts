import Toast from "typescript-toastify"

type ToastType = "info" | "success" | "warning" | "error" | "default"

export function showToast(
  message: string,
  type: ToastType = "default",
) {
  new Toast({
    position: "top-right",
    toastMsg: message,
    autoCloseTime: 3000,
    canClose: true,
    showProgress: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    type,
    theme: "light",
  });
}
