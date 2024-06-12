import RNToast, { ToastOptions } from "react-native-root-toast";

export type ToastProps = {
  message: string;
  options: ToastOptions;
};
export const Toast = (message: string, options: ToastOptions) => {
  RNToast.show(message, {
    ...options,
  });
};
