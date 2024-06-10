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
} & RNTextInputProps;
export function TextInput(props: TextInputProps) {
  const { label = "", editable = true, style, ...rest } = props;

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
          placeholderTextColor={Colors.outlineborder}
          editable={editable}
          style={[{ color: Colors.textprimary }, style]}
          {...rest}
        />
      </View>
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
