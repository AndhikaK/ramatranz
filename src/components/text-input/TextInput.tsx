import { ReactNode } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type TextInputProps = {
  label: string;
  trailingIcon?: ReactNode;
  errorMessage?: string;
} & RNTextInputProps;
export function TextInput(props: TextInputProps) {
  const {
    label = "",
    editable = true,
    style,
    errorMessage = "",
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography fontFamily="Poppins-Medium" fontSize={14}>
        {label}
      </Typography>
      <View
        backgroundColor={editable ? "transparent" : "outlineborder"}
        style={[styles.inputWrapper, { borderColor: Colors.outlineborder }]}
      >
        <RNTextInput
          placeholderTextColor={Colors.textsecondary}
          editable={editable}
          style={[{ color: Colors.textprimary }, style]}
          {...rest}
        />
      </View>

      {!!errorMessage && (
        <Typography fontFamily="Poppins-Light" fontSize={10} color="dangerbase">
          {errorMessage}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 26,
    gap: 10,
  },
});
