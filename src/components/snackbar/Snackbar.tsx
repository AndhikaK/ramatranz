import { StyleSheet } from "react-native";
import RNToast, {
  ToastHideParams,
  ToastProps,
  ToastShowParams,
} from "react-native-toast-message";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type SnackbarProps = {
  message: string;
};
export function SnackbarRoot(props: ToastProps) {
  const { config, ...rest } = props;

  return (
    <RNToast
      config={{
        ...config,
        custom_toast: ({ props: toastProps }: { props: SnackbarProps }) => {
          const { message } = toastProps;

          return (
            <View style={styles.container}>
              <View backgroundColor="paper" style={styles.snackbarWrapper}>
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  {message}
                </Typography>
              </View>
            </View>
          );
        },
      }}
      type="custom_toast"
      position="top"
      {...rest}
    />
  );
}

export const Snackbar = {
  show: (
    params: Omit<ToastShowParams, "props" | "text1" | "text2" | "type"> & {
      message: string;
    }
  ) => {
    const { message = "" } = params;
    RNToast.show({
      ...params,
      props: {
        message,
      },
    });
  },
  hide: (params: ToastHideParams) => {
    RNToast.hide(params);
  },
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 34,
    paddingTop: 16,
  },
  snackbarWrapper: {
    width: "100%",
    padding: 12,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.12,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
