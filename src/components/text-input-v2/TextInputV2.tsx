import { ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { View } from "../view/View";

export type TextInputV2Props = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
} & TextInputProps;
export function TextInputV2(props: TextInputV2Props) {
  const { leadingIcon, trailingIcon, withBorder = true, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: withBorder ? 1 : 0,
          borderColor: Colors.outlineborder,
          padding: withBorder ? 12 : 0,
        },
      ]}
    >
      {leadingIcon}

      <TextInput
        placeholderTextColor={Colors.textsecondary}
        style={[styles.textInput, { color: Colors.textprimary }]}
        {...rest}
      />

      {trailingIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
  },
  textInput: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flex: 1,
  },
});
